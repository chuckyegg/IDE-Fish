var Server 	= require('./server.js');
var server 	= new Server();

var gpioSetup = function (opts) {
}

gpioSetup.prototype.call = function(){
	//Setup the GPIO Pins here
	//Example:

	// server.mode(pin, mode, (data) => {
	// 	console.log(data);
	// });
}
module.exports = gpioSetup;