var express = require('express');
var app = express();
var serv = require('http').Server(app);



app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));
app.use('/Videos',express.static(__dirname + '/Videos'));

serv.listen(3000);

var io = require('socket.io')(serv,{});

var SOCKET_LIST = {};

io.sockets.on('connection', function(socket){
	SOCKET_LIST[socket.id] = socket;
	console.log(socket.id);

	// socket.on('pause', function(data){
	// 	//console.log(data.curTime);
	// 	socket.broadcast.emit('pause', {curTime: data.curTime});
	// });

	socket.on("RESTART", function(data){
			socket.broadcast.emit('START', {data});
	});

	socket.on("START", function(){
			socket.broadcast.emit('START');
	});

	// socket.on('play', function(data){
	// 	//socket.broadcast.emit('play', {curTime: data.curTime});
	// 	socket.broadcast.emit('play', {curTime: data.curTime});
	// });

	socket.on('disconnect', function(){
		console.log("user " + socket.id + " disconnect");
	});



});
