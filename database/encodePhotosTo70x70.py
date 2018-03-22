import os
import base64
from PIL import Image
import sys
import cStringIO

input_dirname = sys.argv[1]
output_dirname = sys.argv[2]

for filename in os.listdir(input_dirname):
  buffer = cStringIO.StringIO()
  with Image.open(input_dirname + '/' + filename) as image_file:
    new_img = image_file.resize((70, 70))
    new_img.save(buffer, format="JPEG", optimize=True)
    encoded_string = base64.b64encode(buffer.getvalue())
    output = open(output_dirname + '/' + filename, "w")
    output.write(encoded_string)
    output.close()
  buffer.truncate(0)
    