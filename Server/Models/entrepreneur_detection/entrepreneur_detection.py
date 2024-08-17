import re
from nltk.corpus import stopwords
from nltk import word_tokenize
import nltk
import ssl
import numpy as np
import torch
from transformers import AutoTokenizer, AutoModel
import json
import joblib
import shap
from huggingface_hub import PyTorchModelHubMixin

'''
1 . Predict
2 . Explain
'''

# ----------------- GLOBAL VARIABLES -----------------

# tokenizer parameters
MAX_LEN = 512
# setting the model name
PRE_TRAINED_MODEL_NAME = 'roberta-base'
# TOKENIZER
tokenizer = AutoTokenizer.from_pretrained(PRE_TRAINED_MODEL_NAME)

# setting the device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


# ----------------- MODEL CLASS -----------------

class ROBERTAClass(torch.nn.Module, PyTorchModelHubMixin):
    def __init__(self, PRE_TRAINED_MODEL_NAME="roberta-base", num_classes=4, dropout=0.3):
        super(ROBERTAClass, self).__init__()
        self.bert_model = AutoModel.from_pretrained(
            PRE_TRAINED_MODEL_NAME, return_dict=True, output_attentions=True)
        self.dropout = torch.nn.Dropout(dropout)
        self.linear = torch.nn.Linear(768, num_classes)

    def forward(self, input_ids, attention_mask, token_type_ids):
        output = self.bert_model(
            input_ids,
            attention_mask=attention_mask,
            token_type_ids=token_type_ids
        )
        output_dropout = self.dropout(output.pooler_output)
        output = self.linear(output_dropout)
        return output

    def getProbabilities(self, input):
        input = input.tolist()
        input = [clean_text(text) for text in input]
        input = tokenizer(input, max_length=MAX_LEN, truncation=True,
                          padding='longest', return_token_type_ids=True, return_tensors='pt')
        input = {key: tensor.to(device) for key, tensor in input.items()}
        output = self.forward(**input)
        probabilities = torch.sigmoid(output)
        return probabilities

    def getBinaryProbs(self, input):
        probabilities = self.getProbabilities(input)
        IE = []
        NS = []
        TF = []
        JP = []
        # Iterate over each item in the probabilities tensor
        for prob in probabilities:
            # Apply the transformation to each item and directly append to the list
            IE.append(torch.tensor([1 - prob[0], prob[0]]))
            NS.append(torch.tensor([1 - prob[1], prob[1]]))
            TF.append(torch.tensor([1 - prob[2], prob[2]]))
            JP.append(torch.tensor([1 - prob[3], prob[3]]))

        # Convert the list of tensors to a single tensor
        IE = torch.stack(IE)
        NS = torch.stack(NS)
        TF = torch.stack(TF)
        JP = torch.stack(JP)
        return IE, NS, TF, JP
    # ----------------- MODEL PREDICTION -----------------

    def predict(self, text):
        return self.getProbabilities(np.array([text])).round()[0].detach().numpy().tolist()

    # ----------------- SHAP EXPLANATION -----------------
    def explain(self, input, aspect):
        def get_aspect_explanation(input):
            IE, NS, TF, JP = self.getBinaryProbs(input)

            if aspect == 'IE':
                return IE
            elif aspect == 'NS':
                return NS
            elif aspect == 'TF':
                return TF
            elif aspect == 'JP':
                return JP
            else:
                raise ValueError("Invalid aspect provided.")
        if isinstance(input, str):
            input = clean_text_for_explain(input)
        else:
            input = [clean_text_for_explain(text) for text in input]
        class_names = self.get_class_names(aspect)
        aspect_explainer = shap.Explainer(
            get_aspect_explanation, masker=shap.maskers.Text(), output_names=class_names)
        shap_values = aspect_explainer(input)
        return shap_values
    # ----------------- HELPER FUNCTIONS -----------------

    def get_class_names(self, aspect):
        if aspect == 'IE':
            return ["Introvert", "Extrovert"]
        elif aspect == 'NS':
            return ["Intuition", "Sensing"]
        elif aspect == 'TF':
            return ["Thinking", "Feeling"]
        elif aspect == 'JP':
            return ["Judging", "Perceiving"]
        else:
            raise ValueError("Invalid aspect provided.")


model = ROBERTAClass.from_pretrained("omarahmedsaad/entrepreneur_detection")
model.eval()
torch.grad = False

# ----------------- PREDICTION FUNCTION -----------------


def decode_traits(probs):
    traits = [['Introversion', 'Extroversion'], ['Intuition', 'Sensing'],
              ['Thinking', 'Feeling'], ['Judging', 'Perceiving']]
    result = [traits[i][int(prob)] for i, prob in enumerate(probs)]
    return result


def addTraitAcronym(traits):
    Acronym = traits[0][0]
    if (traits[1] == 'Intuition'):
        Acronym += 'N'
    else:
        Acronym += 'S'
    Acronym += traits[2][0]+traits[3][0]
    return Acronym


def predict(text):
    if (clean_text_for_explain(text) == ''):
        return "Please provide a valid input."
    result = decode_traits(model.predict(text))
    if (result[0] == 'Introversion' and result[1] == 'Intuition' and result[2] == 'Thinking' and result[3] == 'Precieving'):
        result.insert(0, 'INTP')
        result.append('Entrepreneur')
    else:
        result.insert(0, addTraitAcronym(result))
        result.append('Non-Entrepreneur')
    return result

# ----------------- SHAP EXPLANATION FUNCTION -----------------


def custom_json_serializer(obj):
    if isinstance(obj, np.ndarray):
        return obj.tolist()  # Convert NumPy array to list
    elif isinstance(obj, tuple):
        return list(obj)  # Convert tuple to list
    elif isinstance(obj, np.float32):
        return float(obj)  # Convert np.float32 to Python float
    elif isinstance(obj, np.float64):
        return float(obj)  # Convert np.float64 to Python float
    # Add more conversions as needed
    return obj


def explain(input, aspect):
    if (clean_text_for_explain(input) == ''):
        return "Please provide a valid input."
    shap_values = model.explain([input], aspect)
    shap_values_data = {
        'values': shap_values.values,
        'base_values': shap_values.base_values,
        'data': shap_values.data,
    }

    shap_values_json = json.dumps(
        shap_values_data, default=custom_json_serializer)

    return shap_values_json


def plot_explanation(input, aspect):
    if (clean_text_for_explain(input) == ''):
        return """ <p> 
                        Please provide a valid input.
                 </p>   """
    shap_values = model.explain([input], aspect)
    return shap.plots.text(shap_values, display=False)


# ----------------- PREPROCESSING FUNCTION -----------------

# Text Cleaning Functions
# Disable SSL verification
ssl._create_default_https_context = ssl._create_unverified_context
nltk.download('stopwords')
nltk.download('punkt')
stop_words = set(stopwords.words('english'))


def mystopwords(text):
    return ' '.join([w for w in word_tokenize(text) if not w in stop_words])


def clean_text(string):
    clean = re.sub(r"(?:\@|http?\://|https?\://|www)\S+|\#\w+",
                   "", string)  # remove mentions & hashtags
    # remove url
    clean = re.sub(
        r'\w+:\/{2}[\d\w-]+(\.[\d\w-]+)*(?:(?:\/[^\s/]*))*', ' ', clean)
    clean = re.sub('[\n]', ' ', clean)  # remove newline character
    # remove non alphabetic characters
    clean = re.sub('[^a-zA-Z]', ' ', clean.lower())
    clean = re.sub(r'[,]', ' ', clean)
    clean = mystopwords(clean)  # remove stopwords
    clean = re.sub(r'\s+', ' ', clean)  # removve extra spaces
    return clean


def clean_text_for_explain(string):
    clean = re.sub(r"(?:\@|http?\://|https?\://|www)\S+|\#\w+",
                   "", string)  # remove url
    clean = re.sub(r'\s+', ' ', clean)  # removve extra spaces
    return clean
