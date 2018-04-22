var Gpio 	= require('pigpio').Gpio;

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

Gpio.prototype.rotate = function(percentage) {
	var deviation = 1000 * percentage;
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
			if (pin.getServoPulseWidth() > 2200 || pin.getServoPulseWidth() < 800) { 
				// FLIP
				if (pin.direction === '+')
					pin.direction = '-';
				else
					pin.direction = '+';
			}

			var go = pin.direction === '+' ? pin.increment : -pin.increment; 

			var clampo = clamp(Math.round(self.getServoPulseWidth() + go), 500, 2500)


			self.servoWrite(clampo)
		}, 30, this);
	};

	this.increment = percentage * (multiplier || 1);	
}

Gpio.prototype.reset = function() {
	this.servoWrite(1500);
}

module.exports = Gpio; 