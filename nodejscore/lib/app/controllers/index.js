var dataController = require('./datacontroller');
var mqttController = require('./mqttcontroller');

var controller = {};

controller.dataController = dataController;
controller.mqttController = mqttController;

module.exports = controller;