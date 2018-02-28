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

app.get("/repos", function(req, res) {
  // connection.connect();
  var q = 'SELECT * FROM business WHERE city="Toronto" LIMIT 1';
  // We will agree on roughly ~10 business ID's to test
  // id business city needs to be dynamic based on the business ID
  // query needs to reflect location and cuisine
  connection.query(q, function(err, rows, fields) {
    if (err) throw err;
    console.log(rows, "hi im rows");
    // console.log shows up in node
    res.send(rows);
  });
});

app.listen(3002, function() {
  console.log("Listening on 3002!");
});
