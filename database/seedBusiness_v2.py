t = open('business.csv', 'w+')

cnt = 1
for i in range(60):
  with open('yelp_business.csv', 'r') as f:  
    line = f.readline()
    while line:
      t.write(str(cnt) + ',' + str(cnt) + ',' + line) 
      cnt += 1      
      line = f.readline()
  f.close()

t.close()