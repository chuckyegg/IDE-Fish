var app 	= require('http').createServer();
var io 		= require('socket.io')(app);
var Gpio 	= require('./gpio.js');
app.listen(955);
console.log('App listening on port 955');

var rightServo 	= new Gpio(23, {mode: Gpio.OUTPUT});
var topServo 	= new Gpio(17, {mode: Gpio.OUTPUT});
var bottomServo = new Gpio(27, {mode: Gpio.OUTPUT});
var leftServo	= new Gpio(22, {mode: Gpio.OUTPUT});
var backServo 	= new Gpio(15, {mode: Gpio.OUTPIT});

rightServo.reset();
topServo.reset();
bottomServo.reset();
leftServo.reset();
backServo.reset();

io.on('connection', function (socket) {
	socket.emit('connected');
	console.log('Client connected.');

	socket.on('rotate', (data) => {
		var direction = data.servo;
		var percentage = data.angle;

		if(direction === 'vertical'){
			 leftServo.rotate(percentage);
			 rightServo.rotate(percentage);
		}
		if(direction === 'horizontal'){
			topServo.rotate(percentage);
			bottomServo.rotate(percentage);
		}

	});

	socket.on('speed', (data) => {
		var mulitplier = 1;
		var percentage = data.speed;
		backServo.speed(percentage);
	});

});
