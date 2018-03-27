// const mysql = require('mysql');
const mysql = require('promise-mysql');

const databaseHost = process.env.DATABASE_HOST || 'localhost';
const databasePort = process.env.DATABASE_PORT || 3306;

const pool = mysql.createPool({
  connectionLimit: 140,
  host: databaseHost,
  port: databasePort,
  user: 'chompy',
  database: 'chompy',
  password: 'Chompy4&!database',
  debug: false
});

const executeQuery = q => {
  return pool.query(q).then(rows => {
    return rows;
  })
  .catch(err => {
    console.log('Error: ', err);
    res.sendStatus(500);
  });
};

const executeQueryWithCache = (q, key) => {
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

module.exports = {
  executeQuery,
  executeQueryWithCache
}