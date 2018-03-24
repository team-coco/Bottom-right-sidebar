const express = require('express');
const executeQuery = require('./connectionPool.js');
const router = express.Router();

// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import AppDescription from '../client/src/js/AppDescription.jsx';

router
  .route('/business/:id')
  .get((req, res, next) => {
    var id = req.params.id;
    let q = `SELECT * FROM business WHERE id = '${id}'`;
    executeQuery(q).then(rows => res.send(rows));
  })
  .options((req, res) => {
    res.sendStatus(200);
  });

router
  .route('/postalCode/:code')
  .get((req, res, next) => {
    var postalCode = req.params.code;
    // let q = `SELECT * FROM business WHERE postal_code='${postalCode}' AND review_count > 200 LIMIT 4`;
    let q = `SELECT * FROM business_reviews200 WHERE postal_code='${postalCode}' LIMIT 4`;
    executeQuery(q).then(rows => res.send(rows));
  })
  .options((req, res) => {
    res.sendStatus(200);
  }); 

router
  .route('/businessTips/:id')
  .get((req, res, next) => {
    var id = req.params.id;
    let q = `SELECT * FROM tip WHERE business_id='${id}' LIMIT 1`;
    executeQuery(q).then(rows => res.send(rows));
  })
  .options((req, res) => {
    res.sendStatus(200);
  }); 

router
  .route('/photos/:id')
  .get((req, res, next) => {
    var id = req.params.id;
    let q = `SELECT photo_id as id, business_id, caption, label FROM photo WHERE business_id='${id}' LIMIT 1`;
    executeQuery(q).then(rows => res.send(rows));
  })
  .options((req, res) => {
    res.sendStatus(200);
  }); 


// router
//   .route('/:roomid/description/ssr')
//   .get((req, res, next) => {
//     db.findOne(+req.params.roomid)
//       .then(desc => res.send(renderToString(<AppDescription roomId={req.params.roomid} description={desc}/>)))
//       .catch(err => {
//         console.log('Error retrieving description for room ', req.params.roomid, ' from database');
//         res.sendStatus(404);
//       });
//   })
//   .options((req, res) => {
//     res.sendStatus(200);
//   });

module.exports = router;
