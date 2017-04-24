var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
//var morgan = require('morgan');
var cfg = require('_/config');
var fs = require('fs');
var path = require('path');
require('dotenv').config();

//var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//app.use(morgan('tiny', { stream: accessLogStream }));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.locals.cfg = cfg;

// middleware
app.use(require('./routes.js'));


// custom error middleware
//app.use(require('_/middleware/notFound'));
//app.use(require('_/middleware/handleError'));

module.exports = app;
