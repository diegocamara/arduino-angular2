var five = require('johnny-five');
var Oled = require('oled-js');
var font = require('oled-font-5x7');

function FrontOled(opts) {

    this.oledOptions = {
        width: 128,
        height: 64,
        address: 0x3C
    };

    if (opts) {
        configureOledOptions(this.oledOptions, opts);
    }

    this.oled;

}

FrontOled.prototype.initOled = function (board) {
    this.oled = new Oled(board, five, this.oledOptions);
    this.clearDisplay();

}

FrontOled.prototype.clearDisplay = function () {
    this.oled.setCursor(1, 1);
    this.oled.clearDisplay();
    this.oled.fillRect(0, 0, this.oled.WIDTH, this.oled.HEIGHT, 0);
    this.oled.update();
}

FrontOled.prototype.writeString = function (text, size) {
    this.clearDisplay();
    this.oled.setCursor(1, 1);
    this.oled.writeString(font, size, text, 1, true, 2);
}

function configureOledOptions(frontOledOptions, filterFrontOledOptions) {

    if (filterFrontOledOptions.width) {
        frontOledOptions.width = filterFrontOledOptions.width;
    }

    if (filterFrontOledOptions.height) {
        frontOledOptions.height = filterFrontOledOptions.height;
    }

    if (filterFrontOledOptions.address) {
        frontOledOptions.address = filterFrontOledOptions.address;
    }

}


module.exports = FrontOled;