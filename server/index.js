const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();

app.use(express.static('./client/dist/'));
const port = process.env.PORT || 3010;
const databaseHost = process.env.DATABASE_HOST || 'localhost';
const databasePort = process.env.DATABASE_PORT || 3306;

var pool = mysql.createPool({
  connectionLimit: 140,
  host: databaseHost,
  port: databasePort,
  user: 'chompy',
  database: 'chompy',
  password: 'Chompy4&!database',
  debug: false
}); 

var executeQuery = function (query, res) {
  pool.getConnection(function (err, connection) {
    if (err) {
      console.log('Error: ', err);
      res.sendStatus(500);
    }
    connection.query(query, function (err, rows) {
      connection.release();
      if (err) {
        console.log('Error: ', err);
        res.sendStatus(500);
      }
      res.send(rows);
    });
  });
};

app.get('/sidebar/business/:id', function(req, res) {
  var id = req.params.id;
  let q = `SELECT * FROM business WHERE id = '${id}'`;
  executeQuery(q, res);
});

app.get('/sidebar/postalCode/:code', function(req, res) {
  var postalCode = req.params.code;
  // let q = `SELECT * FROM business WHERE postal_code='${postalCode}' AND review_count > 200 LIMIT 4`;
  let q = `SELECT * FROM business_reviews200 WHERE postal_code='${postalCode}' LIMIT 4`;
  executeQuery(q, res);
});

app.get('/sidebar/businessTips/:id', function(req, res) {
  var id = req.params.id;
  let q = `SELECT * FROM tip WHERE business_id='${id}' LIMIT 1`;
  executeQuery(q, res);
});

app.get('/sidebar/photos/:id', function(req, res) {
  var id = req.params.id;
  let q = `SELECT photo_id as id, business_id, caption, label FROM photo WHERE business_id='${id}' LIMIT 1`;
  executeQuery(q, res);
});

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
