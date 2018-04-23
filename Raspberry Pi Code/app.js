var app 	= require('http').createServer();
var io 		= require('socket.io')(app);
var Gpio 	= require('./gpio.js');

io.origins('*:*') 
app.listen(955);
console.log('App listening on port 955');

var rightServo 	= new Gpio(27, {mode: Gpio.OUTPUT});
var topServo 	= new Gpio(23, {mode: Gpio.OUTPUT});
var bottomServo = new Gpio(22, {mode: Gpio.OUTPUT});
var leftServo	= new Gpio(17, {mode: Gpio.OUTPUT});
var backServo 	= new Gpio(15, {mode: Gpio.OUTPIT});

var LDR			= new Gpio(21, {mode: Gpio.OUTPUT});

rightServo.reset();
topServo.reset();
bottomServo.reset();
leftServo.reset();
backServo.reset();

backServo.speed(1, 1);


io.on('connection', function (socket) {
	socket.emit('connected');
	console.log('Client connected.');

	setInterval(() => {
		setTimeout(() => {
			LDR.mode(Gpio.OUTPUT);
			LDR.digitalWrite(0);
		},10);
		LDR.mode(Gpio.INPUT);

		time = Date.now();

		while(LDR.digitalRead() != 1){
		}
		socket.emit('LDR', {time: (time - Date.now())});


	}, 1000);

	socket.on('rotate', (data) => {
		var direction = data.direction;
		var percentage = data.value;

		if(direction === 'vertical'){
			 leftServo.rotate(-percentage);
			 rightServo.rotate(percentage);
		}
		if(direction === 'horizontal'){
			topServo.rotate(-percentage);
			bottomServo.rotate(percentage);
		}

	});

	socket.on('speed', (data) => {
		var mulitplier = data.mulitplier;
		var percentage = data.speed;
		backServo.speed(percentage, mulitplier);
	});

});
