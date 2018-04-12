var socket 	= require('./socket.js');
var fs 		= require('fs');					
const path	= require('path');

var Initialisation = function (opts) {
}

Initialisation.prototype.gpioSetup = function() {
	var pins = {};																
	fs.readFile(path.join(__dirname, '../GPIOSetup.txt'), 'utf8', (err, GPIOData) => {	
		if (err) {																	
		  console.log("Error Loading GPIOSetup.txt");
		  console.log(err)
		  return;
		}

		var GPIODataLine = GPIOData.split(/\r?\n/igm);								

		for (var i = 1; i <= GPIODataLine.length - 1; i++) {						
			var pinDetails = GPIODataLine[i].split(/\t/);							
									
			if (pinDetails[1] === 'NULL') {											
				continue;
			}

			var pin  = pinDetails[0];
			var mode = pinDetails[1];

			socket.emit('GPIOSetup', { pin, mode });
		}
		socket.on('pin.state', (data) => {
			// We got an update 
			pins[data.pin] = data.mode;
		});

		socket.on('pin.err', (data) => {
			console.log(data);
		});
	});

	return pins;
}
module.exports = Initialisation;