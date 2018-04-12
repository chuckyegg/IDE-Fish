var socket 	= require('./libs/socket.js');
var Server 	= require('./libs/server.js');
var Setup 	= require('./libs/gpioSetup.js');
const delay = require('delay');

var server 	= new Server();
var setup 	= new Setup();

var pins = {};
var connected = false;

console.log('Started Correctly');

socket.on('connected', (data) => {						
	console.log('Connected to Pi on socket ' + socket.id);
	connected = true;
	setup.call();
	server.getMode(1, data => {console.log(data)});
	sign = true;
	pulseWidth = 500;
	//thingy(pulseWidth);
	server.pwmWrite(17, 5, data => {console.log(data)});
	server.pwmFrequency(17, 125, (data) => {
		console.log(data);
	});
});

socket.on('disconnect', (data) => {
	console.log('Disconnected, attempting to reconnect');
});

var thingy = function (pulseWidth){
	if(sign){
		pulseWidth = 1500;
		sign = false;
	}else{
		pulseWidth = -600;
		sign = true;
	}
	// if( pulseWidth >= 2500 || pulseWidth <= 5x00){
	// 	sign =! sign;
	// }
	
	server.servoWrite(17, pulseWidth, (data) => {
		console.log(data);
	})

	setTimeout(() => {thingy(pulseWidth)}, 1000);
}