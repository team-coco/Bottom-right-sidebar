const express = require("express");
const app = express();
const mysql = require("mysql");

// app.use(bodyParser.json());
app.use(express.static("../client/dist"));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "yelp_db"
});

connection.connect(function(err) {
  if (err) {
    console.log("ERROR");
  } else {
    console.log("MYSQL CONNECTED");
  }
});

app.get("/yelp/repos", function(req, res) {
  let q = 'SELECT * FROM business WHERE city="Las Vegas" LIMIT 1';
  connection.query(q, function(err, rows, fields) {
    if (err) throw err;
    console.log(rows, "hi im rows business repo");
    res.send(201, rows);
  });
});

app.get("/yelp/postalCode", function(req, res) {
  let q =
    'SELECT * FROM business WHERE postal_code="89123" AND review_count > 100 LIMIT 3';
  connection.query(q, function(err, rows, fields) {
    if (err) throw err;
    console.log(rows, "hi im rows postalCode");
    // console.log shows up in node
    res.send(201, rows);
  });
});

app.get("/yelp/businessTips", function(req, res) {
  let q = "SELECT * FROM tip LIMIT 1";
  connection.query(q, function(err, rows, fields) {
    if (err) throw err;
    console.log(rows, "hi im rows businessTips");
    // console.log shows up in node
    res.send(rows);
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

// app.get("/:id", (req, res) => {
//   res.sendFile(path.join(__dirname + "/../dist/index.html"));
// });

app.listen(3002, function() {
  console.log("Listening on 3002!");
});
