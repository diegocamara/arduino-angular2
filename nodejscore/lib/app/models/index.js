"use strict";
var loader = require('../../util/loader');
var path = require('path');
var env = process.env.NODE_ENV || 'development';
var config = require('./databaseconfig.json')[env];
var uriUtil = require('mongodb-uri');
var mongoose = require('mongoose');

var mongodbUri = config.storage;
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.Promise = global.Promise;

//mongoose.connect(mongooseUri, config.options);

var db = {};

loader(__dirname, function(file){
  var model = require(path.join(__dirname, file));  
  db[model.modelName] = model;
});

db.mongoose = mongoose;

module.exports = db;
