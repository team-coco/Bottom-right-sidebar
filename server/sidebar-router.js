const express = require('express');
const HtmlApi = require('./HtmlApi.js');
const ssr = require('./ssr.js');
const router = express.Router();

let query = require('./mysqlPool.js');
const databaseEngine = process.env.DATABASE_ENGINE || 'mysql';
if (databaseEngine === 'cassandra') {
  query = require('./cassandraPool.js');
}

router
  .route('/ssr/:id')
  .get((req, res, next) => {
    let id = parseInt(req.params.id);
    if (id > 0) {
      ssr(req, res, next, 'apiSSR_' + id, id, HtmlApi); 
    } else {
      res.sendStatus(404);
    }
  })
  .options((req, res) => {
    res.sendStatus(200);
  });

router
.route('/business/:id')
.get((req, res, next) => {
  let id = parseInt(req.params.id);
  if (id > 0) {
    query(`SELECT * FROM business WHERE id =${id}`, 'apiBusiness_' + id)
    .then(rows => {
      res.send(rows);
    })
    .catch(err => console.log('Error ', err));
  } else {
    res.sendStatus(404);
  }
})
.options((req, res) => {
  res.sendStatus(200);
});

router
  .route('/postalCode/:code')
  .get((req, res, next) => {
    // let q = `SELECT * FROM business WHERE postal_code='${postalCode}' AND review_count > 200 LIMIT 4`;
    query(`SELECT * FROM business_reviews200 WHERE postal_code='${req.params.code}' LIMIT 4`, 'apiPostalCode_' + req.params.code, req, res, next)
    .then(rows => {
      res.send(rows);
    })
    .catch(err => console.log('Error ', err));
  })
  .options((req, res) => {
    res.sendStatus(200);
  }); 

router
  .route('/businessTips/:id')
  .get((req, res, next) => {
    let id = parseInt(req.params.id);
    if (id > 0) {
      query(`SELECT * FROM tip WHERE business_id=${id} LIMIT 1`, 'apiTips_' + id, req, res, next)
      .then(rows => {
        res.send(rows);
      })
      .catch(err => console.log('Error ', err));
    } else {
      res.sendStatus(404);
    }
  })
  .options((req, res) => {
    res.sendStatus(200);
  }); 

router
  .route('/photos/:id')
  .get((req, res, next) => {
    let id = parseInt(req.params.id);
    if (id > 0) {
      query(`SELECT photo_id as id, business_id, caption, label FROM photo WHERE business_id=${id} LIMIT 1`, 'apiPhotos_' + id, req, res, next)
      .then(rows => {
        res.send(rows);
      })
      .catch(err => console.log('Error ', err));
    } else {
      res.sendStatus(404);
    }
  })
  .options((req, res) => {
    res.sendStatus(200);
  }); 



module.exports = router;
