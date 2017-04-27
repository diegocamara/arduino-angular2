var mqtt = require('mqtt');
var brokerUrl = 'mqtt://localhost';

var componentsMap = {};

exports.mqttConnectInit = function (onMessageCallback) {

    var mqttClient = mqtt.connect(brokerUrl);

    mqttClient.on('connect', function () {
        console.log('System connect to', brokerUrl);
        mqttClient.subscribe('#', function (err, granted) {

        });

        mqttClient.on('message', function (topic, message) {

            topic = topic.toString().replace(new RegExp('/', 'g'), '');
            
                console.log('Topic', topic.toString(), 'has been added to the components map.');
                componentsMap[topic] = JSON.parse(message.toString());
                     

            onMessageCallback(componentsMap); 

        });

    });

};

exports.consultRegisteredTopics = function(req, res, next){

    res.send(JSON.stringify(componentsMap));

}

exports.consultMicrocontrollerInfo = function(req, res, next){

    var microcontrollerId = req.query.microcontrollerId;
        
    res.send(componentsMap);
    

}

function isExistsComponent(topic) {
    return Object.keys(componentsMap).length > 0 && componentsMap.hasOwnProperty(topic);
}