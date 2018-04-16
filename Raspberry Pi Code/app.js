var app 	= require('http').createServer();
var io 		= require('socket.io')(app);
var Gpio 	= require('pigpio').Gpio;

app.listen(955);
console.log('App listening on port 955');

var pinSetup = {};

for (var i = Gpio.MIN_GPIO; i < Gpio.MAX_GPIO; i++) {
    var gpio = new Gpio(i);
	
    console.log('GPIO %d - mode=%s level=%s', gpio.getMode(), gpio.digitalRead())
	
    pinSetup[i] = gpio;
    pinSetup[i].pin = i;
}

io.on('connection', function (socket) {
	socket.emit('connected');
	console.log('Client connected.');

	socket.on('digitalRead', (data) => {
		pin = data.pin;
		state = pinSetup[pin].digitalRead();
		console.log('Digital read request for pin ' + pin);
		socket.emit('digitalRead.' + pin, {pin, state});
	});

	socket.on('digitalWrite', (data) => {
		pin = data.pin;
		level = data.level;
		console.log('Digital write request for pin ' + pin)
		pinSetup[pin].digitalWrite(level);
		newLevel = pinSetup[pin].digitalRead();
		socket.emit('digitalWrite.' + pin, {pin, level: newLevel});
	});

	socket.on('mode', (data) => {
		pin = data.pin;
		mode = data.mode;
		console.log('Mode request for pin ' + pin);
		pinSetup[pin].mode(mode);
		newMode = pinSetup[pin].getMode();
		socket.emit('mode.' + pin, {pin, mode: newMode});
	});

	socket.on('getMode', (data) => {
		pin = data.pin;
		console.log('Get mode request for pin ' + pin);
		mode = pinSetup[pin].getMode();
		socket.emit('getMode.' + pin, {pin, mode});
	});

	socket.on('pullUpDown', (data) => {
		pin = data.pin;
		pud = data.pud;
		console.log('Pull up down request for pin ' + pin);
		pinSetup[pin].pullUpDown(pud);
		socket.emit('pullUpDown.' + pin, {pin, pud});
	});

	socket.on('trigger', (data) => {
		pin = data.pin;
		pulseLen = data.pulseLen;
		level = data.level;
		console.log('Trigger request for pin ' + pin);
		pinSetup[pin].trigger(pulseLen, level);
		socket.emit('trigger.' + pin, {pulseLen, level});
	});

	socket.on('pwmWrite', (data) => {
		pin = data.pin;
		dutycycle = data.dutycycle;
		console.log('PWM write request for pin ' + pin);
		pinSetup[pin].pwmWrite(dutycycle);
		newDutycycle = pinSetup[pin].getPwmDutyCycle();
		socket.emit('pwmWrite.' + pin, {pin, dutycycle: newDutycycle});
	});

	socket.on('hardwarePwmWrite', (data) => {
		pin = data.pin;
		frequency = data.frequency;
		dutycycle = data.dutycycle;
		console.log('Hardware PWM write request for pin ' + pin);
		pinSetup[pin].hardwarePwmWrite(frequency, dutycycle);
		socket.emit('hardwarePwmWrite.' + pin, {pin, frequency, dutycycle});
	});

	socket.on('getPwmDutyCycle', (data) =>{
		pin = data.pin;
		console.log('Get PWM dutycycle request for pin ' + pin);
		dutycycle = pinSetup[pin].getPwmDutyCycle();
		socket.emit('getPwmDutyCycle.' + pin, {pin, dutycycle});
	});

	socket.on('pwmRange', (data) => {
		pin = data.pin;
		range = data.range;
		console.log('PWM range request for pin ' + pin);
		pinSetup[pin].pwmRange(range);
		newRange = pinSetup[pin].getPwmRange();
		socket.emit('pwmRange.' + pin, {pin, range: newRange});
	});

	socket.on('getPwmRange', (data) => {
		pin = data.pin;
		console.log('Get PWM range request for pin ' + pin);
		range = pinSetup[pin].getPwmRange();
		socket.emit('getPwmRange.' + pin, {pin, range});
	});

	socket.on('getPwmRealRange', (data) => {
		pin = data.pin;
		console.log('Get PWM real range request for pin ' + pin);
		realRange = pinSetup[pin].getPwmRealRange();
		socket.emit('getPwmRealRange.' + pin, {pin, realRange});
	});

	socket.on('servoWrite', (data) => {
		pin = data.pin;
		pulseWidth = data.pulseWidth;
		console.log('Servo write request for pin ' + pin);
		pinSetup[pin].servoWrite(pulseWidth);
		newPulseWidth = pinSetup[pin].getServoPulseWidth();
		socket.emit('servoWrite.' + pin, {pin, pulseWitdth: newPulseWidth});
	});

	socket.on('getServoPulseWidth', (data) => {
		pin = data.pin;
		console.log('Get servo pulse width request for pin ' + pin);
		pulseWidth = pinSetup[pin].getServoPulseWidth();
		socket.emit('getServoPulseWidth.' + pin, {pin, pulseWidth});
	});

	socket.on('enableInterrupt', (data) => {
		pin = data.pin;
		edge = data.edge;
		timeout = data.timeout;
		console.log('Enable Interrupt request for pin ' + pin);
		pinSetup[pin].enableInterrupt(edge, timeout);
		socket.emit('enableInterrupt.' + pin, {pin, edge, timeout});
	});

	socket.on('disableInterrupt', (data) => {
		pin = data.pin;
		console.log('Disable interrupt request for pin ' + pin);
		pinSetup[pin].disableInterrupt();
		socket.emit('disableInterrupt.' + pin, {pin});
	});

	socket.on('enableAlert', (data) => {
		pin = data.pin;
		console.log('Enable alert request for pin ' + pin);
		pinSetup[pin].enableAlert();
		socket.emit('enableAlert.' + pin, {pin});
	});

	socket.on('disableAlert', (data) => {
		pin = data.pin;
		console.log('Disable alert request for pin ' + pin);
		pinSetup[pin].disableAlert();
		socket.emit('disableAlert.' + pin, {pin});
	});
});
