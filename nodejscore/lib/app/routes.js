var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
var controllers = require('./controllers');
var routes = require('./routes.json');
var multer = require('multer');

var mqttController = controllers.mqttController;

router.get(routes.GET_REGISTERED_TOPICS, mqttController.consultRegisteredTopics);

router.get(routes.GET_MICROCONTROLLER_INFO, mqttController.consultMicrocontrollerInfo);

router.get(routes.ENABLE_TOPIC_LISTENER, mqttController.enableTopicListener);

router.get(routes.DISABLE_TOPIC_LISTENER, mqttController.disableTopicListener);


module.exports = router;