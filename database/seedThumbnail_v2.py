import os
import sys

input_dirname = sys.argv[1]
t = open('thumbnails.csv', 'a+')

cnt = 1
for filename in os.listdir(input_dirname):
  with open(input_dirname + '/' + filename) as image_file:
    thumbnail = image_file.read()
    t.write(str(cnt) + ',' + str(cnt) + ',' + thumbnail + '\n')
    cnt += 1    
  image_file.close()        

t.close()