/**
 * Created by Logan on 2014-11-10.
 */
var ctx;
var socket = io();

function createWindow(canvas){
	document.getElementById('messenger').style.backgroundColor = "#aaaaaa";
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    ctx = canvas.getContext("2d");
    ctx.font = "20px Arial";
}

var messegeToSend = "";
function sendMessege(event){
	if (event.keyCode == 13){
		messegeToSend = document.getElementById('input_text').value;
		if(messegeToSend != ""){
			document.getElementById('input_text').value = "";
			socket.emit('sendMessege', messegeToSend);
		}
	} 
}

socket.on('whateverServerMessege', onBlahBlah);
socket.on('addMessege', onAddMessage);

function onBlahBlah(dataFromServer){
	var name = prompt(dataFromServer.messege, "");
	if (name != null) {
	    socket.emit('userInitialized', name);
	}
	else{
		socket.emit('userInitialized', "Anonymous");
	}
}

// Class for Messegs
function Messege(user, messege){
	this.user = user;
	this.messege = messege;
}

var messeges = [];
function onAddMessage(newMessage){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	messeges.unshift(new Messege(newMessage.user, newMessage.messege));
	for (var i = messeges.length - 1; i >= 0; i--) {
		ctx.fillText(messeges[i].user + ": " + messeges[i].messege, 10, .9*canvas.height - i*25);
	}
}