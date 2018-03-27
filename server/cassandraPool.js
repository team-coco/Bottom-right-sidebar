const cassandra = require('cassandra-driver');
 //Connect to the cluster
const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'chompy'});

const executeQuery = q => client.execute(q, []);

module.exports = executeQuery;