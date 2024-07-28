from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from controller import *
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

client = MongoClient(app.config["MONGO_URI"])
db = client.ai_portfolio

@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

@app.route("/predict", methods=["POST"])
def predict_fn():
    data = request.get_json()
    model_name = data.get("modelName")
    text = data.get("text")

    if not model_name or not text:
        return jsonify({"error": "Model name and text are required"}), 400

    result = predict(model_name, text)
    return jsonify({"modelName": model_name, "text": text, "result": result})

@app.route("/explain", methods=["POST"])
def explain_fn():
    data = request.get_json()
    model_name = data.get("modelName")
    text = data.get("text")

    if not model_name or not text:
        return jsonify({"error": "Model name and text are required"}), 400

    result = explain(model_name, text)
    return jsonify({"modelName": model_name, "text": text, "result": result})

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

@app.route("/students", methods=["POST"])
def add_student_fn():
    student_data = request.get_json()
    print(request)
    if not student_data:
        return jsonify({"error": "Student data is required"}), 400

    result = add_student(student_data, db)
    if "error" in result:
        return jsonify(result), 400

    return jsonify({"_id": result["_id"], "message": "Student added successfully"}), 201

@app.route("/students", methods=["GET"])
def list_students_fn():
    students = list_students(db)
    return jsonify(students), 200

@app.route("/students/<student_id>", methods=["GET"])
def get_student_fn(student_id):
    student = get_student(student_id, db)
    if not student:
        return jsonify({"error": "Student not found"}), 404
    return jsonify(student), 200

if __name__ == "__main__":
    app.run(debug=True)