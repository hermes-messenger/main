var express_lib = require('express');
var http_lib = require('http');
var io_lib = require('socket.io');

var app = express_lib();
var http = http_lib.createServer(app);
var io = io_lib.listen(http);

app.get('/', function(req, res){
    res.sendfile('index.html');
});

app.use(express_lib.static(__dirname + '/')); 

io.on('connection', function(socket){

	/*
		Put stuff you want to happen when the user joins here
	*/
	var exampleWayToTransferSetsOfData = {
		name : "Jesse",
		messege : "This message came from the server"
	};
	socket.emit('whateverServerMessege', exampleWayToTransferSetsOfData);	// This send data to the user who connected

	socket.broadcast.emit("newUser", null);	// Sends to all other users connected to the server


	/*
		Declare your own custom event handlers here
	*/
    socket.on('consoleLog', function(toBeLogged){
        console.log(toBeLogged);
    });

    socket.on('disconnect', function(){
        // What happens when a user disconnects
        socket.broadcast.emit("userLeft", null);
    });
});

http.listen(3000, function(){
    console.log("listening on port 3000.");
});