var cfg = require('_/config');
var log = require('_/log');
var models = require('_/app/models');
var app = require('_/app');
var robotjs = require();


/*
models.mongoose.connection.on('error', console.error.bind(console, 'Connection error:'));

models.mongoose.connection.once('open', function(callback){
    console.log('Connected to mongodb');
    app.listen(cfg.port, function(){
        console.log('app listening on port', cfg.port);
    });
});

*/

app.listen(cfg.port, function(){
        console.log('app listening on port', cfg.port);
});