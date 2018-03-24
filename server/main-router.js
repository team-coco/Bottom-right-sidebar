const express = require('express');
const path = require('path');

import React from 'react';
import { renderToString } from 'react-dom/server';
import RightBottomSidebar from '../client/src/components/App.jsx';
const Html = require('./Html');
const executeQuery = require('./connectionPool.js');

const router = express.Router();

router.route('/ssr/:id')
  .get((req, res, next) => {
    let iniState = {};
    let id = req.params.id;
    let q = `SELECT * FROM business WHERE id = '${id}'`;
    executeQuery(q)
    .then(row => {
      iniState.business = row;
      q = `SELECT * FROM business_reviews200 WHERE postal_code='${row[0].postal_code}' LIMIT 4`;
      return executeQuery(q);
    })
    .then(rows => {
      iniState.business1 = rows[1];
      iniState.business2 = rows[2];
      iniState.business3 = rows[3];
      iniState.loaded = true;
      const body = renderToString(<RightBottomSidebar businessId={id} initialState={iniState}/>);
      res.send(
        Html({
          body: body,
          initialState: JSON.stringify(iniState)
        })
      );
    })
    .catch(err => {
      console.log('Error ', err);
      res.sendStatus(404);
    });
  })
  .options((req, res) => {
    res.sendStatus(200);
  });

router.route('/:id')
  .get((req, res, next) => res.sendFile('index.html', { root: path.resolve('public') }))
  .options((req, res) => {
    res.sendStatus(200);
  });

module.exports = router;