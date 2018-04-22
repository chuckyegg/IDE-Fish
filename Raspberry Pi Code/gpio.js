var Gpio 	= require('pigpio').Gpio;


Gpio.prototype.rotate = function(percentage) {
	var deviation = 1000 * percentage;
	var newAngle = 1500 + deviation;
	this.servoWrite(newAngle);
}

Gpio.prototype.speed = function(percentage, multiplier) {
	if(!this.sweeper){
		this.target = 2500;
		this.increment = 1;

		this.sweeper = setInterval( (pin) => {
			if(pin.increment > 0 && pin.getServoPulseWidth() >= pin.target){
				pin.increment = -pin.increment;
				pin.target = 500;
				return;
			}
			if(pin.increment <= 0 && pin.getServoPulseWidth() <= pin.target){
				pin.increment = -pin.increment;
				pin.target = 2500;
				return;
			}
			pin.servoWrite(pin.getServoPulseWidth() + pin.increment)
		}, 1, this);
	};

	pin.increment = percentage * (multiplier || 1);	
}

Gpio.prototype.reset = function() {
	this.servoWrite(1500);
}

module.exports = Gpio; 