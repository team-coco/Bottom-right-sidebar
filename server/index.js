const express = require("express");
const app = express();
const mysql = require("mysql");
const path = require("path");

app.use(express.static("../client/dist"));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chompy"
});

connection.connect(function(err) {
  if (err) {
    console.log("ERROR");
  } else {
    console.log("MYSQL CONNECTED");
  }
});

app.get("/yelp/repos/:id", function(req, res) {
  var id = req.params.id;
  let q = `SELECT * FROM business WHERE id = "${id}"`;
  connection.query(q, function(err, rows, fields) {
    if (err) throw err;
    res.status(201).send(rows);
  });
});

app.get("/yelp/postalCode/:code", function(req, res) {
  var postalCode = req.params.code;
  let q = `SELECT * FROM business WHERE postal_code="${postalCode}" AND review_count > 100 LIMIT 3`;
  // edit to dynamically insert zip code of req.body
  connection.query(q, function(err, rows, fields) {
    if (err) throw err;
    console.log(rows, "hi im rows postalCode");
    res.status(201).send(rows);
  });
});

app.get("/yelp/businessTips/:id", function(req, res) {
  var id = req.params.id;
  let q = `SELECT * FROM tip WHERE business_id="${id}" LIMIT 3`;
  connection.query(q, function(err, rows, fields) {
    if (err) throw err;
    res.status(201).send(rows);
  });
});

app.get("/:id", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/dist/index.html"));
});

app.listen(3002, function() {
  console.log("Listening on 3002!");
});
