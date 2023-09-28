const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./api');

app.use(express.json());
app.use(express.static("./public"))
app.use(
    cors({
      origin: "*",
    })
  );
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

app.use('/api', api);

// app.use('/api', require('./routes/api'));

module.exports = app;