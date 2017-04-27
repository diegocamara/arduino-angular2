var mqtt = require('mqtt');
var brokerUrl = 'mqtt://localhost';
var io;
var componentsMap = {};

exports.mqttConnectInit = function (socketio, onMessageCallback) {

    io = socketio;

    var mqttClient = mqtt.connect(brokerUrl);

    mqttClient.on('connect', function () {
        console.log('System connect to', brokerUrl);
        mqttClient.subscribe('#', function (err, granted) {

        });

        mqttClient.on('message', function (topic, message) {
            messageJson = JSON.parse(message.toString());

            console.log('Topic', topic.toString(), 'has been added to the components map.');

            var microcontrollerId = messageJson.id.split('.')[0];

            if (!componentsMap.hasOwnProperty(microcontrollerId)) {
                componentsMap[microcontrollerId] = {
                    value: [messageJson]
                };
            } else {

                var moduleIndex = indexOfModule(messageJson.id, componentsMap[microcontrollerId].value);

                if (moduleIndex == -1) {
                    componentsMap[microcontrollerId].value.push(messageJson);
                } else {
                    componentsMap[microcontrollerId].value[moduleIndex] = messageJson;
                }

            }

            onMessageCallback(componentsMap);

        });

    });

};

exports.consultRegisteredTopics = function (req, res, next) {

    res.send(JSON.stringify(componentsMap));

}

exports.consultMicrocontrollerInfo = function (req, res, next) {

    var microcontrollerId = req.query.microcontrollerId.toString().toLowerCase();

    res.send(componentsMap[microcontrollerId]);

}

exports.enableTopicWebsocket = function (req, res, next) {

    var topic = req.query.topic;
    var clientSocketId = req.query.clientSocketId;

    var mqttClient = mqtt.connect(brokerUrl);

    mqttClient.subscribe(topic, function(error, granted){
        console.log('Topic ', topic, ' on mqtt.');

       // io.sockets.socket(clientSocketId).emit();

    });

}

function indexOfModule(moduleId, modules) {

    var indexOfModule = -1;

    for (var moduleIndex = 0; moduleIndex < modules.length; moduleIndex++) {

        if (modules[moduleIndex].id == moduleId) {
            indexOfModule = moduleIndex;
            break;
        }

    }

    return indexOfModule;

}

function isExistsComponent(topic) {
    return Object.keys(componentsMap).length > 0 && componentsMap.hasOwnProperty(topic);
}