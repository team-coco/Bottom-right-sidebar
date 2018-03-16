// Slow. It gets slower and slower after 100000 records in memory

const crypto = require('crypto');
const mysql = require('promise-mysql');
const fs = require('fs');
const Promise = require('bluebird');

var newId = function (id) {
  var sha1 = crypto.createHash("sha1");
  sha1.update(id);
  return sha1.digest("hex").substring(0, 22);
}

const connOptions = {
  host: 'localhost',
  user: 'chompy',
  password: 'chompydatabase',
  database: 'yelp_db'
};

let businessStream = fs.createWriteStream("business_generated_2.csv", { flags: 'a' });
let businessRowId = 1;
let mysqlConn;
const BUSINESS_MULT = 75;

let connection = mysql.createConnection(connOptions)
.then(conn => {
  mysqlConn = conn;
  return mysqlConn.query('SELECT * FROM business');
})
.then(rows => {
  rows.forEach((business, idx) => {
    let id = business.id;
    for (let i = 0; i < BUSINESS_MULT; ++i) {
      businessRowId = (idx + 1) * BUSINESS_MULT + i;
      businessStream.write(`${businessRowId},${id},${business.name},${business.neighborhood},${business.address},${business.city},${business.state},${business.postal_code},${business.latitude},${business.longitude},${business.stars},${business.review_count},${business.is_open}\n`);
      id = newId(id);
    }
  })
})
.catch(err => console.log('Error ', err));
  