var cfg = require('_/config');
var log = require('_/log');
var models = require('_/app/models');
var app = require('_/app');
var mqttController = require('_/app/controllers').mqttController;
//var Raspi = require('raspi-io');
//var five = require('johnny-five');
//var Robot = require('./robotjs/robot/robot');
//var board = new five.Board({ repl: false });
var mqtt = require('mqtt');
/*
models.mongoose.connection.on('error', console.error.bind(console, 'Connection error:'));

models.mongoose.connection.once('open', function(callback){
    console.log('Connected to mongodb');
    app.listen(cfg.port, function(){
        console.log('app listening on port', cfg.port);
    });
});

var robot = new Robot({
    motionOptions: {
        baseServoOptions: {
            pin: 0,
            startAt: 90
        },
        headServoOptions: {
            pin: 1,
            startAt: 80
        }
    }
}, board);
*/

app.listen(cfg.port, function () {

    console.log('App listening on port', cfg.port);

    mqttController.mqttConnectInit(function(){
        
    });
    

    /*
    console.log('System looking for compatible hardware.');
    board.on('ready', function () {
        console.log('Hardware ready!.');
        //robot.initSystem();
    });
    */

});
