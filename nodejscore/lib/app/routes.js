var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
var controllers = require('./controllers');
var routes = require('./routes.json');
var multer = require('multer');

module.exports = router;