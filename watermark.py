from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw
import matplotlib.pyplot as plt
import numpy as np
import base64

image = Image.open("puppy.jpg")

image.show()  
plt.imshow(image)
  
watermark_image = image.copy()
  
draw = ImageDraw.Draw(watermark_image)
font = ImageFont.truetype("arial.ttf", 50)
  

draw.text((0, 0), "puppy", (255, 255, 255), font=font)
plt.subplot(1, 2, 2)
plt.title("white text")
plt.imshow(watermark_image)