const cassandra = require('cassandra-driver');
const distance = cassandra.types.distance;
const redis = require('./redis.js');

 //Connect to the cluster
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'], 
  keyspace: 'chompy',
  pooling: {
    coreConnectionsPerHost: {
      [distance.local]: 10,
      [distance.remote]: 1
    }
  }
});

const executeQuery = q => client.execute(q, []);

const executeQueryWithCache = (q, key, req, res, next) => {
  redis.get(key)
    .then(data => {
      if (data) {
        res.json(data);
        return;
      } else {
        return executeQuery(q);
      }
    })
    .then(rows => {
      if (rows === undefined) return;
      res.send(rows);
      return redis.set(key, JSON.stringify(rows));
    })
    .then(() => { })
    .catch(err => {
      console.log('Error ', err);
    });
};

const isCached = process.env.CACHE || 'redis';
let query = executeQueryWithCache;
if (isCached === 'none') {
  query = executeQuerye;
}

module.exports = query;