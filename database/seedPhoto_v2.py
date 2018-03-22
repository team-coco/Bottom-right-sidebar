import csv

t = open('photo.csv', 'a+')

tid = 1
with open('yelp_photo.csv', 'rb') as csvfile:
    yt = csv.reader(csvfile, delimiter=',', quotechar='"')
    for yt_line in yt:
        for i in range(50):
            tid += 1
            t.write(str(tid) + ',' + str(tid) + ',' + str(tid) + ',' + yt_line[2] + ',' + yt_line[3] + '\n')        

t.close()