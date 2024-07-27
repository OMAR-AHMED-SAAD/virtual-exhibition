import sys
from importlib.machinery import SourceFileLoader
import joblib

def predict(model_name, text):
    module = SourceFileLoader(model_name, f"Models/{model_name}/{model_name}.py").load_module()
    return module.predict(text)

def explain(model_name, text):
    module = SourceFileLoader(model_name, f"Models/{model_name}/{model_name}.py").load_module()
    return module.explain(text)

def plot_explanation(model_name, text):
    pass

def generate(model_name, text):
      module = SourceFileLoader(model_name, f"Models/{model_name}/{model_name}.py").load_module()
      return module.generate(text)
