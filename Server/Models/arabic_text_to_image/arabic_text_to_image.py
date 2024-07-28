from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from diffusers import DiffusionPipeline
import torch
import io
import base64
import json

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


def generate(text):
    # read the saved texts in the json file
    with open("./Models/arabic_text_to_image/prompts.json", "r") as file:
        data = json.load(file)
    for obj in data:
        if text in obj['prompt']:
            return obj['imagestr']
        # Load tokenizer and model
    tokenizer = AutoTokenizer.from_pretrained("Helsinki-NLP/opus-mt-ar-en")
    model = AutoModelForSeq2SeqLM.from_pretrained("Helsinki-NLP/opus-mt-ar-en")
    # Load Diffusion pipeline
    pipe = DiffusionPipeline.from_pretrained(
        "runwayml/stable-diffusion-v1-5",  variant="fp16", )
    pipe.to(device)
    pipe.safety_checker = None
    pipe.requires_safety_checker = False
    with torch.no_grad():
        batch = tokenizer(text, return_tensors="pt")
        # Generate image prompt
        generated_ids = model.generate(**batch)
        prompt = tokenizer.batch_decode(
            generated_ids, skip_special_tokens=True)[0]
        images = pipe(prompt=prompt, num_images_per_prompt=1,
                      num_inference_steps=50).images[0]
        buffered = io.BytesIO()
        images.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
        # save the generated image and text to the json file
        data.append({'prompt': text, 'imagestr': img_str})
        with open('./Models/arabic_text_to_image/prompts.json', 'w') as file:
            json.dump(data, file)
    return img_str
