var express = require('express');

var app = express();

app.listen(3000);

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/gamepad.html");

})