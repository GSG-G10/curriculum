const express = require('express');

const router = require('./controllers');

const app = express();
app.use(express.json());

app.set('port', process.env.PORT || 3000);

app.use(router);

module.exports = app;
