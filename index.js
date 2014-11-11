/**
* Created by Logan on 2014-11-10.
*/

/*
    Global variables
    These are needed everywhere, so it is easier to make them
    global than pass them around
*/
var ctx;
var canvas;
var radius;
var users;
var socket = io();

function User() {
    // This stores the users name, and the position of the center of their
    // chat section, right along the circle's edge
    this.name="";
    this.xpos=-1;
    this.ypos=-1;

}

function setCanvas(myCanvas){
	canvas = myCanvas;
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
	ctx = canvas.getContext("2d");
}

var numUsers = 6;
function createUsers(){

    // create users with default name
    numUsers = 5;
    users = new Array(numUsers);
    for(var i=1; i<=numUsers; i++ )
    {
        users[i-1] = new User();
        users[i-1].name = "Player " + i;
    }
    drawSections(numUsers);
}

function mannyDraw(){
	ctx.beginPath();
    ctx.moveTo(canvas.width/4, 0);
    ctx.lineTo(canvas.width*3/4,canvas.height);
    
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width,canvas.height/2);
    
    ctx.moveTo(canvas.width*3/4, 0);
    ctx.lineTo(canvas.width/4,canvas.height);
    ctx.stroke();
}

var whoToDraw = "";
function setTodrawMannys(){
	whoToDraw = "Manny";
	mannyDraw();
}

var MessageToSend = "";
function sendMessage(event){
	if (event.keyCode == 13){
        console.log('send');
		MessageToSend = document.getElementById('input_text').value;
		if(MessageToSend != ""){
			document.getElementById('input_text').value = "";
			socket.emit('sendMessage', MessageToSend);
		}
	} 
}

socket.on('whateverServerMessage', onBlahBlah);
socket.on('addMessage', onAddMessage);

function onBlahBlah(dataFromServer){
	var name = prompt(dataFromServer.Message, "");
	if (name != null) {
	    socket.emit('userInitialized', name);
	}
	else{
		socket.emit('userInitialized', "Anonymous");
	}
}

// Class for Messejs
function Message(user, Message){
	this.user = user;
	this.Message = Message;
}

var Messages = [];
function onAddMessage(newMessage){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    mannyDraw();
	Messages.unshift(new Message(newMessage.user, newMessage.Message));
	for (var i = Messages.length - 1; i >= 0; i--) {
		ctx.fillText(Messages[i].user + ": " + Messages[i].Message, 10, .9*canvas.height - i*25);
	}
}