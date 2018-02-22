const express = require('express');
const app = express();

// app.use(bodyParser.json());
app.use(express.static('../client/dist'));
app.listen(3002, function () { console.log('Listening on 3002!') });
