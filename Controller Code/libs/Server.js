var socket = require('./socket.js');

var Server = function (opts) {

}

Server.prototype.digitalRead = function(pin, cb) {
	socket.emit('digitalRead', { pin });
	socket.once('digitalRead.' + pin, cb);
}

Server.prototype.digitalWrite = function(pin, level, cb){
	socket.emit('digitalWrite', {pin, level});
	socket.once('digitalWrite' + pin, cb);
}

Server.prototype.mode = function(pin, mode, cb){
	socket.emit('mode', {pin, mode});
	socket.once('mode.' + pin, cb);
}

Server.prototype.getMode = function(pin, cb){
	socket.emit('getMode', {pin});
	socket.once('getMode.' + pin, cb)
}

Server.prototype.pullUpDown = function(pin, pud, cb){
	socket.emit('pullUpDown', {pin, pud});
	socket.once('pullUpDown.' + pin, cb);
}

Server.prototype.trigger = function(pin, pulseLen, level, cb){
	socket.emit('trigger', {pin, pulseLen, level});
	socket.once('trigger.' + pin, cb);
}

Server.prototype.pwmWrite = function(pin, dutycycle, cb){
	socket.emit('pwmWrite', {pin, dutycycle});
	socket.once('pwmWrite.' + pin, cb);
}

Server.prototype.hardwarePwmWrite = function(pin, frequency, dutycycle, cb){
	socket.emit('hardwarePwmWrite', {pin, frequency, dutycycle});
	socket.once('hardwarePwmWrite.' + pin, cb);
}

Server.prototype.getPwmDutyCycle = function(pin, cb){
	socket.emit('hardwarePwmWrite', {pin});
	socket.once('hardwarePwmWrite.' + pin, cb);
}

Server.prototype.pwmRange = function(pin, range, cb){
	socket.emit('pwmRange', {pin, range});
	socket.once('pwmRange.' + pin, cb);
}

Server.prototype.getPwmRange = function(pin, cb){
	socket.emit('getPwmRange', {pin});
	socket.once('getPwmRange.' + pin, cb);
}

Server.prototype.getPwmRealRange = function(pin, cb){
	socket.emit('getPwmRealRange', {pin});
	socket.once('getPwmRealRange.' + pin, cb);
}

Server.prototype.pwmFrequency = function(pin, frequency, cb){
	socket.emit('pwmFrequency', {pin, frequency});
	socket.once('pwmFrequency.' + pin, cb);
}

Server.prototype.getPwmFrequency = function(pin, cb){
	socket.emit('getPwmFrequency', {pin});
	socket.once('getPwmFrequency.' + pin, cb);
}

Server.prototype.servoWrite = function(pin, pulseWidth, cb){
	socket.emit('servoWrite', {pin, pulseWidth});
	socket.once('servoWrite.' + pin, cb);
}

Server.prototype.getServoPulseWidth = function(pin, cb){
	socket.emit('getServoPulseWidth', {pin});
	socket.once('getServoPulseWidth.' + pin, cb);
}

Server.prototype.enableInterrupt = function(pin, edge, timeout, cb){
	socket.emit('enableInterrupt', {pin, edge, timeout});
	socket.once('enableInterrupt.' + pin, cb);
}

Server.prototype.enableInterrupt = function(pin, edge, cb){
	var timeout = 0;
	socket.emit('enableInterrupt', {pin, edge, timeout});
	socket.once('enableInterrupt.' + pin, cb);
}

Server.prototype.disableInterrupt = function(pin, cb){
	socket.emit('disableInterrupt', {pin});
	socket.once('disableInterrupt.' + pin, cb);
}

Server.prototype.enableAlert = function(pin, cb){
	socket.emit('enableAlert', {pin});
	socket.once('enableAlert.' + pin, cb);
}

Server.prototype.disableAlert = function(pin, cb){
	socket.emit('disableAlert', {pin});
	socket.once('disableAlert.' + pin, cb);
}

module.exports = Server;