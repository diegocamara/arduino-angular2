var five = require('johnny-five');

function Robot(opts, board) {   
    this.board = board;
    var Motion = require('./motion');
    var motionOpts;
    if (opts && opts.motionOptions) {
        motionOpts = opts.motionOptions;
    }
    this.motion = new Motion(motionOpts);

    var FrontOled = require('./front-oled');
    var frontOledOptions;
    if(opts && opts.frontOledOptions){
        frontOledOptions = opts.frontOledOptions;
    }
    this.frontOled = new FrontOled(frontOledOptions);      

}

Robot.prototype.initSystem = function () {
    this.motion.initializeHardware();  
    this.frontOled.initOled(this.board);
    this.idle();
}

Robot.prototype.idle = function () {
    this.motion.idle();
    this.frontOled.writeString('MOTION STATE: IDLE...', 2);
}

module.exports = Robot;