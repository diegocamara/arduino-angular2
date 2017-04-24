var five = require('johnny-five');
var easeFunctions = require('./ease-component-functions').easeComponentFunctions;

function Motion(opts) {

    this.baseServoOptions = {
        address: 0x40,
        controller: 'PCA9685',
        pin: 0,
        startAt: 0
    };

    this.headServoOptions = {
        address: 0x40,
        controller: 'PCA9685',
        pin: 1,
        startAt: 0
    };

    if (opts && opts.baseServoOptions) {
        configureServoOptions(this.baseServoOptions, opts.baseServoOptions);
    }

    if (opts && opts.headServoOptions) {
        configureServoOptions(this.headServoOptions, opts.headServoOptions);
    }

    this.base;
    this.head;

}

Motion.prototype.initializeHardware = function () {
    
    this.base = new five.Servo(this.baseServoOptions);
    this.head = new five.Servo(this.headServoOptions);

}

Motion.prototype.baseTo = function (degree) {

    if (this.base) {
        this.base.to(degree);
    } else {
        console.log('base motion not set!');
    }

}

Motion.prototype.headTo = function (degree) {

    if (this.head) {
        this.head.to(degree);
    } else {
        console.log('head motion not set!');
    }

}

Motion.prototype.idle = function () {

    var animationBase = new five.Animation(this.base);
    var animationHead = new five.Animation(this.head);

    animationBase.enqueue(generateRandomSegment(animationBase, { minDegree: 40, maxDegree: 120, minDuration: 10000, maxDuration: 50000 }));
    animationHead.enqueue(generateRandomSegment(animationHead, { minDegree: 60, maxDegree: 100, minDuration: 10000, maxDuration: 50000 }));

}

function configureServoOptions(motionServoOptions, filterServoMotionOptions) {

    if (filterServoMotionOptions.address) {
        motionServoOptions.address = filterServoMotionOptions.address;
    }

    if (filterServoMotionOptions.controller) {
        motionServoOptions.controller = filterServoMotionOptions.controller;
    }

    if (filterServoMotionOptions.pin) {
        motionServoOptions.pin = filterServoMotionOptions.pin;
    }

    if (filterServoMotionOptions.startAt) {
        motionServoOptions.startAt = filterServoMotionOptions.startAt;
    }

}

function generateRandomSegment(animation, opts) {

    var cuePoints = [0, 0.25, 0.5, 0.75, 1];
    var keyFrames = [null, getRandomKeyFrameObject(opts), getRandomKeyFrameObject(opts), getRandomKeyFrameObject(opts), getRandomKeyFrameObject(opts)];
    var duration = getRandomIntRange(opts.minDuration, opts.maxDuration);

    return {
        cuePoints: cuePoints,
        keyFrames: keyFrames,
        duration: duration,
        oncomplete: function () {            
            animation.enqueue(generateRandomSegment(animation, opts));
        },
    };
}

function getRandomKeyFrameObject(opts) {

    var degrees = getRandomIntRange(opts.minDegree, opts.maxDegree);
    var easing = getRandomEaseFunction();

    return {
        degrees: degrees,
        easing: easing
    };

}

function getRandomIntRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomEaseFunction() {
    return easeFunctions[getRandomIntRange(0, (easeFunctions.length - 1))];
}

module.exports = Motion;