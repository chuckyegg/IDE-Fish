var socket 	= require('./libs/socket.js');
var Server 	= require('./libs/server.js');

var server 	= new Server();

var pins = {};
var connected = false;

console.log('Started Correctly');

socket.on('connected', (data) => {						
	console.log('Connected to Pi on socket ' + socket.id);
	connected = true;

});

socket.on('disconnect', (data) => {
	console.log('Disconnected, attempting to reconnect');
});

