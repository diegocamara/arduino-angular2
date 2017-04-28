var cfg = require('_/config');
var log = require('_/log');
var models = require('_/app/models');
var app = require('_/app');
var mqttController = require('_/app/controllers').mqttController;
var mqtt = require('mqtt');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
//var Raspi = require('raspi-io');
//var five = require('johnny-five');
//var Robot = require('./robotjs/robot/robot');
//var board = new five.Board({ repl: false });
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

io.on('connection', function(client){  

});

server.listen(cfg.port, function () {

    console.log('App listening on port', cfg.port);

    mqttController.mqttConnectInit(io, function(componentsMap){       
        //io.clients().emit('topicregistered', componentsMap);
    });
    
    /*
    console.log('System looking for compatible hardware.');
    board.on('ready', function () {
        console.log('Hardware ready!.');
        //robot.initSystem();
    });
    */

});
