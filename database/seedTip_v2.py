import csv

t = open('tip.csv', 'a+')

tid = 0
with open('yelp_tip.csv', 'rb') as csvfile:
    yt = csv.reader(csvfile, delimiter=',', quotechar='"')
    for yt_line in yt:
        for i in range(11):
            tid += 1
            t.write(str(tid) + ',' + str(tid) + ',' + str(tid) + ',' + yt_line[3] + ',' + yt_line[4] + ',' + str(yt_line[5]) + '\n')        

t.close()