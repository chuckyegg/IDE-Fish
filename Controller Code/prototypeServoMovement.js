var socket 	= require('./libs/socket.js');
var Server 	= require('./libs/server.js');
var Setup 	= require('./libs/gpioSetup.js');
// const delay = require('delay');

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
	server.digitalWrite(23, 0, data => {console.log(data)});
	server.digitalRead(24, data => {console.log(data)});

});

socket.on('disconnect', (data) => {
	console.log('Disconnected, attempting to reconnect');
});
