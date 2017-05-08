var mqtt = require('mqtt');
var brokerUrl = 'mqtt://10.42.0.1';
var io;
var componentsMap = {};
var mqttClients = [];
var mqttServerConnectionStatus = 'OFFLINE';

exports.mqttConnectInit = function (socketio, onMessageCallback) {

    io = socketio;

    var mqttClient = new mqtt.connect(brokerUrl);

    mqttClient.on('connect', function () {
        console.log('System connect to', brokerUrl);
        console.log('Mqtt topic listener online, waiting for messages.');
        mqttServerConnectionStatus = 'ONLINE';
        io.clients().emit('mqttserverconnectionchange', mqttServerConnectionStatus);
        mqttClient.subscribe('#', function (err, granted) {

            addMqttClient(mqttClient, 'topicListener');

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

            io.clients().emit('topicregistered', messageJson.id);

            onMessageCallback(componentsMap);

        });

    });

    mqttClient.on('error', function (error) {
        console.log(error);
    });

    mqttClient.on('reconnect', function () {
        console.log('Mqtt topic listener offline, trying to reconnect...');
    });

    mqttClient.on('close', function () {
        mqttServerConnectionStatus = 'OFFLINE';
        io.clients().emit('mqttserverconnectionchange', mqttServerConnectionStatus);
    });

    checkMqttClientsConnection();

};

exports.consultRegisteredTopics = function (req, res, next) {

    var registeredComponents = [];

    Object.keys(componentsMap).forEach(function (microcontroller, microcontrollerIndex, microcontrollers) {

        componentsMap[microcontroller].value.forEach(function (component, componentIndex, components) {
            registeredComponents.push(component.id);
        });

    });

    res.send(JSON.stringify(registeredComponents));

}

exports.consultMicrocontrollerInfo = function (req, res, next) {

    var microcontrollerId = req.query.microcontrollerId.toString().toLowerCase();

    res.send(componentsMap[microcontrollerId]);

}

exports.enableTopicListener = function (req, res, next) {
    var topic = req.query.mqttTopic;
    var clientSocketId = req.query.clientSocketId;
    var webSocketEvent = req.query.webSocketEvent;

    var mqttClient = new mqtt.connect(brokerUrl);
    addMqttClient(mqttClient, clientSocketId);

    var isResponseSend = false;

    mqttClient.on('connect', function () {

        mqttClient.subscribe(topic, function (error, granted) {            
            console.log('Topic', topic, 'on mqtt for client', clientSocketId);
            res.send(JSON.stringify({ mqttClientSubscribe: true }));
            isResponseSend = true;
            mqttClient.on('message', function (topic, message) {
                var messageJson = JSON.parse(message.toString());
                io.to(clientSocketId).emit(webSocketEvent, messageJson);
            });

        });

    });   

    mqttClient.on('offline', function () {
        
        closeMqttClientAndRemove(clientSocketId, function (isSuccess) {
            
            if (!isResponseSend && isSuccess) {
                res.send(JSON.stringify({ mqttClientSubscribe: false }));
            }

        });

    });

}

exports.disableTopicListener = function (req, res, next) {

    var clientSocketId = req.query.clientSocketId;

    closeMqttClientAndRemove(clientSocketId, function (isSuccess) {

        res.send(JSON.stringify({ mqttClientSubscribe: isSuccess }));

    });


}

exports.consultMqttServerConnectionStatus = function (req, res, next) {

    res.send(JSON.stringify(mqttServerConnectionStatus));

}

function addMqttClient(mqttClient, clientId) {

    mqttClients.push({
        clientId: clientId,
        mqttClient: mqttClient
    });

}

function checkMqttClientsConnection() {

    var checkingInterval = 5000;

    setInterval(function () {

        for (var mqttClientIndex = 0; mqttClientIndex < mqttClients.length; mqttClientIndex++) {

            if (mqttClients[mqttClientIndex].clientId != 'topicListener') {

                if (!io.clients().connected[mqttClients[mqttClientIndex].clientId]) {
                    var clientId = mqttClients[mqttClientIndex].clientId;
                    mqttClients[mqttClientIndex].mqttClient.end();
                    mqttClients.splice(mqttClientIndex, 1);
                    console.log('Mqtt for', clientId, 'has been end.');
                }

            }
        }

    }, checkingInterval);

}

function closeMqttClientAndRemove(clientId, callback) {

    var selectedIndex = null;

    for (var mqttClientIndex = 0; mqttClientIndex < mqttClients.length; mqttClientIndex++) {
            
        if (mqttClients[mqttClientIndex].clientId == clientId) {            
            storedMqtt = mqttClients[mqttClientIndex];
            storedMqtt.mqttClient.end();
            selectedIndex = mqttClientIndex;            
            break;
        }

    }

    if (selectedIndex != null) {
        mqttClients.splice(selectedIndex, 1);
        console.log('Mqtt for', clientId, 'has been end.');
        callback(true);
    } else {
        callback(false);
    }

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