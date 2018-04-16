var io 			= require('socket.io-client')		// The script requires the socket.io library   	https://socket.io/docs/ 
const socket 	= io('http://192.168.0.10:955');			// Create a socket to Pi

// Create any handlers or w.e.
// pin create

module.exports = socket;