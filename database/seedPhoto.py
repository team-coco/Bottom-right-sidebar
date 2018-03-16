import csv
# import hashlib

t = open('photo.csv', 'a+')
b = open('business.csv')

businessIds = []
for line in b:
    b_line = line.split(',')
    businessIds.append(b_line[0].strip('"'))

# print('businessIds ', len(businessIds))

tid = 0
with open('yelp_photo.csv', 'rb') as csvfile:
    yt = csv.reader(csvfile, delimiter=',', quotechar='"')
    for yt_line in yt:
        # print(yt_line)
        # newId = yt_line[0]
        for i in range(50):
            tid += 1
            t.write(str(tid) + ',' + yt_line[0] + ',' + businessIds[tid].strip('"') + ',' + yt_line[2] + ',' + yt_line[3] + '\n')        
            # newId = hashlib.sha1(newId).hexdigest()[:22]

t.close()
b.close()