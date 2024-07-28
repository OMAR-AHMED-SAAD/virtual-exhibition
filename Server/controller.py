import sys
from importlib.machinery import SourceFileLoader
import joblib
from database import create_student, get_all_students, get_student_by_id

def predict(model_name, text):
    module = SourceFileLoader(model_name, f"Models/{model_name}/{model_name}.py").load_module()
    return module.predict(text)


def explain(model_name, text):
    module = SourceFileLoader(model_name, f"Models/{model_name}/{model_name}.py").load_module()
    return module.explain(text)

def plot_explanation(model_name, text):
    pass

def add_student(student_data, db):
    try:
        student_id = create_student(student_data, db)
        return {"_id": student_id}
    except ValueError as e:
        return {"error": str(e)}

def list_students(db):
    return get_all_students(db)

def get_student(student_id, db):
    return get_student_by_id(student_id, db)
