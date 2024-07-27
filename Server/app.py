from flask import Flask, render_template,  request, jsonify
from flask_cors import CORS
from controller import *
import json

app = Flask(__name__)
app.config['DEBUG'] = True

# CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})  # Allow only specific origin
# all all in CORS
CORS(app)


@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"


@app.route("/predict", methods=["POST"])
def predict_fn():
    data = request.get_json()
    model_name = data.get("model_name")
    text = data.get("text")

    if not model_name or not text:
        return jsonify({"error": "Model name and text are required"}), 400

    result = predict(model_name, text)
    return jsonify({"model_name": model_name, "text": text, "result": result})


@app.route("/explain", methods=["POST"])
def explain_fn():
    data = request.get_json()
    model_name = data.get("model_name")
    text = data.get("text")

    if not model_name or not text:
        return jsonify({"error": "Model name and text are required"}), 400

    result = explain(model_name, text)
    return jsonify({"model_name": model_name, "text": text, "result": result})


@app.route("/plot")
def plot_explanation_fn():
    pass
    # html_content = plot_explanation(
    #     "entrepreneur_detection", "I love to meet new people and make new friends.")
    # return json.dumps({'html': html_content})
    # return jsonify({'html': html_content})

@app.route("/generate", methods=["POST"])
def generate_fn():
    data = request.get_json()
    model_name = data.get("model_name")
    text = data.get("text")

    if not model_name:
        return jsonify({"error": "Model name and text are required"}), 400
    
    if not text:
        text = None

    result = generate(model_name,text)
    return jsonify({"text": text, "image": result})