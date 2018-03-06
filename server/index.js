const express = require("express");
const app = express();
const mysql = require("mysql");
const path = require("path");

// app.use(bodyParser.json());
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
  // var parm = req;
  //console.log(id, "this is id");
  // console.log(parm, "this is id");
  let q = `SELECT * FROM business WHERE id = "${id}"`;
  // edit to city of selected city
  connection.query(q, function(err, rows, fields) {
    if (err) throw err;
    console.log(rows, "hi im rows business repo");
    res.status(201).send(rows);
  });
});

app.get("/yelp/postalCode/:code", function(req, res) {
  var postalCode = req.params.code;
  console.log(req.params.code, "this");
  // var id = req.params.id;
  // var parm = req.params;
  // console.log(id, "this is id");
  // console.log(parm, "this is id");
  let q = `SELECT * FROM business WHERE postal_code="${postalCode}" AND review_count > 100 LIMIT 3`;
  // edit to dynamically insert zip code of req.body
  connection.query(q, function(err, rows, fields) {
    if (err) throw err;
    console.log(rows, "hi im rows postalCode");
    res.status(201).send(rows);
  });
});

app.get("/yelp/businessTips", function(req, res) {
  let q = `SELECT * FROM tip WHERE business_id="" LIMIT 1`;
  connection.query(q, function(err, rows, fields) {
    if (err) throw err;
    console.log(rows, "hi im rows businessTips");
    // console.log shows up in node
    res.status(201).send(rows);
  });
});

// needs fixin
// app.get("/yelp/repos", (req, res) => {
//   var id = req.body;
//   console.log(id, "THIS IS ID on the SERVER SIDE");
//   var reviews;
//   var query = `SELECT text, user_id, stars FROM review WHERE business_id = "${id}"`;
//   connection.query(query, function(err, rows, fields) {
//     if (err) throw err;
//     res.send(rows);
//   });
// });

app.get("/:id", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/dist/index.html"));
});

app.listen(3002, function() {
  console.log("Listening on 3002!");
});
