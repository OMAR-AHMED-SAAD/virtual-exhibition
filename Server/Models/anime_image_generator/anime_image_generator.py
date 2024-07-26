## imports
import tensorflow as tf
from huggingface_hub import from_pretrained_keras

model = from_pretrained_keras("AhmedKayed/anime-image-generator")
# def function to generate anime images
def generate_anime_images():
     # creating a random nosie to feed it to the trained Generator model
    noise = tf.random.normal([32, 100])
    # Generatine new images using the trained Generator model 
    generated_images = model(noise, training=False)

    # converting the input image to the range [0, 255]
    generated_images1 = (generated_images+127.5)*127.5