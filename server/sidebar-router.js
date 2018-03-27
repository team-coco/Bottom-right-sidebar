const express = require('express');
const HtmlApi = require('./HtmlApi.js');
const ssr = require('./ssr.js');
const router = express.Router();

router.route('/ssr/:id')
  .get((req, res, next) => {
    ssr.send('apiSSR_' + id.toString(), req.params.id, HtmlApi); 
  })
  .options((req, res) => {
    res.sendStatus(200);
  });

router
.route('/business/:id')
.get((req, res, next) => {
  executeQueryWithCache(`SELECT * FROM business WHERE id =${req.params.id}`, 'apiBusiness_' + req.params.id.toString());
})
.options((req, res) => {
  res.sendStatus(200);
});

router
  .route('/postalCode/:code')
  .get((req, res, next) => {
    // let q = `SELECT * FROM business WHERE postal_code='${postalCode}' AND review_count > 200 LIMIT 4`;
    executeQueryWithCache(`SELECT * FROM business_reviews200 WHERE postal_code='${req.params.code}' LIMIT 4`, 'apiPostalCode_' + req.params.code.toString());
  })
  .options((req, res) => {
    res.sendStatus(200);
  }); 

router
  .route('/businessTips/:id')
  .get((req, res, next) => {
    executeQueryWithCache(`SELECT * FROM tip WHERE business_id=${req.params.id} LIMIT 1`, 'apiTips_' + req.params.id.toString());
  })
  .options((req, res) => {
    res.sendStatus(200);
  }); 

router
  .route('/photos/:id')
  .get((req, res, next) => {
    executeQueryWithCache(`SELECT photo_id as id, business_id, caption, label FROM photo WHERE business_id=${req.params.id} LIMIT 1`, 'apiPhotos_' + req.params.id.toString());
  })
  .options((req, res) => {
    res.sendStatus(200);
  }); 



module.exports = router;
