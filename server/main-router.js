const express = require('express');
const path = require('path');
const redis = require('./redis.js');
const ssr = require('./ssr.js');
const Html = require('./Html');
const router = express.Router();

router.route('/ssr/:id')
  .get((req, res, next) => {
    ssr.send('SSR_' + req.params.id.toString(), req.params.id, Html); 
  })
  .options((req, res) => {
    res.sendStatus(200);
  });

router.route('/:id')
  .get((req, res, next) => {
    redis.get('index.html')
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.sendFile('index.html', { root: path.resolve('public') });
          redis.set('index.html', `
          <!DOCTYPE html>
            < html >
            <head>
              <meta charset="UTF-8">
                <title>BRSidebar</title>
            </head>
              <body>
                <div id="right_bottom_sidebar"></div>
                <script src="/app.js" type="text/javascript"></script>
              </body>
            </html>`
          );
        }
      });
  })
  .options((req, res) => {
    res.sendStatus(200);
  });

module.exports = router;