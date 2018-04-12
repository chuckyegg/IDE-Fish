var app 	= require('http').createServer(handler);
var io 		= require('socket.io')(app);
var gpio 	= require('pigpio');

app.listen(3000);

var pinSetup = {};

io.on('connection', function (socket) {
	socket.emit('connected');

	// From here all GPIO events are programmed

	socket.on('GPIOSetup', function (data) {
		var pin  = data.pin;
		var mode = data.mode;

		console.log("Setting pin " + pin + " to " + mode);
		
		switch(mode) {
			case "out":
				mode = GPIO.out;								
				break;
			case "in":
				mode = GPIO.in;
				break; 
		}

		try {
			pinSetup[pin] = new GPIO(pin, {mode: mode});

			socket.emit('pin.state', {pin, mode});
			console.log('Success! Pin ' + pin + ' set to ' + mode);

		} catch (err) {
			socket.emit('pin.err', {pin, mode, err});
			console.log('Error setting pin '+ pin + ' to mode ' + mode + ' ' + err);
		}
	});

	socket.on('digitalRead', (data) => {
		pin = data.pin;
		state = pinSetup.pin.digitalRead();
		socket.emit('digitalRead.' + pin, {state});
	});

	socket.on('digitalWrite', (data) => {
		pin = data.pin;
		level = data.level;
		pinSetup.pin.digitalWrite(level);
		socket.emit('digitalWrite.' + pin, {level});
	})
});