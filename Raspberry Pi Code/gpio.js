var Gpio 	= require('pigpio').Gpio;

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

Gpio.prototype.rotate = function(percentage) {
	var deviation = 300 * percentage;
	var newAngle = 1500 + deviation;

	newAngle = Math.round(clamp(newAngle, 1200, 1800))


	this.servoWrite(newAngle);
}

Gpio.prototype.speed = function(percentage, multiplier) {
	if(!this.sweeper) {
		this.increment = 1;
		this.direction = "+";

		var self = this;

		this.sweeper = setInterval(function(pin) {
			if (pin.getServoPulseWidth() > 1700 || pin.getServoPulseWidth() < 1300) { 
				// FLIP
				if (pin.direction === '+')
					pin.direction = '-';
				else
					pin.direction = '+';
			}

			var go = pin.direction === '+' ? pin.increment : -pin.increment; 

			var clampo = clamp(Math.round(self.getServoPulseWidth() + go), 1300, 1700)


			self.servoWrite(clampo)
		}, 30, this);
	};

	this.increment = percentage * (multiplier || 1);	
}

Gpio.prototype.reset = function() {
	this.servoWrite(1500);
}

// Gpio.prototype.ldrCount = function(){
// 	var count = 0;
// 	var self = this;
// 	setTimeout(function() {
// 		this.mode(Gpio.OUTPUT);
// 		this.digitalWrite(0);
// 	},100, self);

// 	while(this.digitalRead() === 0){

// 	}


	

// }

module.exports = Gpio; 