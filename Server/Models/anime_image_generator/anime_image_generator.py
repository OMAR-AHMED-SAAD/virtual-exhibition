# ## imports
# import tensorflow as tf
# from huggingface_hub import from_pretrained_keras
# import io
# import base64

# model = from_pretrained_keras("AhmedKayed/anime-image-generator")
# # def function to generate anime images
# def generate(args):
#      # creating a random nosie to feed it to the trained Generator model
#     noise = tf.random.normal([32, 100])
#     # Generatine new images using the trained Generator model
#     generated_images = model(noise, training=False)

#     # converting the input image to the range [0, 255]
#     generated_images = (generated_images+127.5)*127.5

import tensorflow as tf
from huggingface_hub import from_pretrained_keras
import io
import base64
from PIL import Image, ImageEnhance
import numpy as np

# Load the pre-trained model
model = from_pretrained_keras("AhmedKayed/anime-image-generator")

# Define function to generate anime images and convert to base64 string
def generate(args):
    # Create random noise
    # Use batch size of 1 for a single image
    noise = tf.random.normal([48, 100])

    # Generate new images using the trained Generator model
    generated_images = model(noise, training=False)

    # Convert the image from [-1, 1] to [0, 255]
    generated_images = (generated_images + 1) * 127.5
    generated_images = generated_images.numpy().astype(np.uint8)

    # Convert NumPy array to PIL Image
    images_arrays = [Image.fromarray(image_array) for image_array in generated_images]

    image_array = []
    for image in images_arrays:
        # Enhance image quality using PIL
        enhancer = ImageEnhance.Sharpness(image)
        image = enhancer.enhance(2.0)  # Increase sharpness by a factor of 2.0

        # Save image to a bytes buffer
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")

        # Convert bytes to base64 string
        image_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")
        image_base64 = "data:image/png;base64," + image_base64
        image_array.append(image_base64)

    return image_array
