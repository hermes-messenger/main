var express_lib = require('express');
var http_lib = require('http');
var io_lib = require('socket.io');

var app = express_lib();
var http = http_lib.createServer(app);
var io = io_lib.listen(http);

app.get('/', function(req, res){
    //res.sendfile('suggestedFix_index.html');
    res.sendfile('index.html');
});

app.use(express_lib.static(__dirname + '/')); 

var os=require('os');
var ifaces=os.networkInterfaces();
var ip = "";
for (var dev in ifaces) {
  ifaces[dev].forEach(function(details){
    if (details.family=='IPv4' && ip == "") {
      ip = details.address;
    }
  });
}
var port = 3000;

io.on('connection', function(socket){

	/*
		Put stuff you want to happen when the user joins here
	*/
	var username = "";

	var exampleWayToTransferSetsOfData = {
		message : "What's your name?"
	};
	socket.emit('whateverServerMessage', exampleWayToTransferSetsOfData);	// This send data to the user who connected

	socket.broadcast.emit("newUser", null);	// Sends to all other users connected to the server


	/*
		Declare your own custom event handlers here
	*/
	socket.on('userInitialized', function(userData){
		username = userData;
		socket.broadcast.emit("newUser", username);
	});

	var dataToSend;
	socket.on('sendMessage', function(newMessage){
		dataToSend = {
			user : username,
			message : newMessage.message,
            reply : newMessage.id,
            target : newMessage.target
		}
		socket.emit('addMessage', dataToSend);
		socket.broadcast.emit('addMessage', dataToSend);
	});

    socket.on('consoleLog', function(toBeLogged){
        console.log(toBeLogged);
    });

    socket.on('disconnect', function(){
        // What happens when a user disconnects
        socket.broadcast.emit("userLeft", username);
    });
});

http.listen(port, function(){
    console.log("listening on",ip?ip:"localhost","port " + port);
});