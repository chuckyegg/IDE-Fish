var Gpio 	= require('pigpio').Gpio;

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

Gpio.prototype.rotate = function(percentage) {
	var deviation = 300 * percentage;
	var newAngle = 1500 + deviation;

	newAngle = Math.round(clamp(newAngle, 500, 2500))


	this.servoWrite(newAngle);
}

Gpio.prototype.speed = function(percentage, multiplier) {
	if(!this.sweeper) {
		this.increment = 1;
		this.direction = "+";

		var self = this;

		this.sweeper = setInterval(function(pin) {

			console.log("current: %s increment %s target %s", self.getServoPulseWidth(), self.increment)

			if (pin.getServoPulseWidth() >= 1600 || pin.getServoPulseWidth() <= 1300) { 
				// FLIP
				if (pin.direction === '+')
					pin.direction = '-';
				else
					pin.direction = '+';
			}

			var go = pin.direction === '+' ? pin.increment : -pin.increment; 

			var clampo = clamp(Math.round(self.getServoPulseWidth() + go), 1000, 2000)


			console.log("new speed: %s", clampo)
			self.servoWrite(clampo)
		}, 40, this);
	};

	this.increment = percentage * (multiplier || 1);	
}

Gpio.prototype.reset = function() {
	this.servoWrite(1500);
}

module.exports = Gpio; 