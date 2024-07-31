# database/schemas.py
from bson.objectid import ObjectId

def validate_student_data(student_data):
    required_fields = {"name", "links", "model", "supervisors", "thesisLink"}
    model_fields = {"name","short_description", "description", "path", "image"}

    # Check for missing required fields
    for field in required_fields:
        if field not in student_data:
            return False, f"Missing required field: {field}"

    # Check for extra fields
    extra_fields = set(student_data.keys()) - required_fields
    if extra_fields:
        return False, f"Unexpected fields: {', '.join(extra_fields)}"

    # Validate types of fields
    if not isinstance(student_data["links"], dict):
        return False, "links should be a dictionary"

    if not isinstance(student_data["model"], dict):
        return False, "model should be a dictionary"

    # Check for required fields in the model dictionary
    for field in model_fields:
        if field not in student_data["model"]:
            return False, f"Missing required model field: {field}"

    extra_fields = set(student_data["model"].keys()) - model_fields
    if extra_fields:
        return False, f"Unexpected fields: {', '.join(extra_fields)}"

    if not isinstance(student_data["supervisors"], list):
        return False, "supervisors should be a list"

    return True, None


def create_student(student_data, db):
    is_valid, error = validate_student_data(student_data)
    if not is_valid:
        raise ValueError(error)

    student_data["model"]["_id"] = ObjectId()

    result = db.students.insert_one(student_data)
    return str(result.inserted_id)


def get_all_students(db):
    students = list(db.students.find())
    for student in students:
        student["_id"] = str(student["_id"])
        student["model"]["_id"] = str(student["model"]["_id"])
    return students


def get_student_by_id(student_id, db):
    student = db.students.find_one({"_id": ObjectId(student_id)})
    if student:
        print(student)
        student["_id"] = str(student["_id"])
        student["model"]["_id"] = str(student["model"]["_id"])
    return student
