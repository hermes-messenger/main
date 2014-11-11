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

var numUsers;
function createWindow(){
    ctx = canvas.getContext("2d");

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

function drawSections(num) {
    var centerx = canvas.width / 2;
    var centery = canvas.height / 2;
    ctx.moveTo(centerx, centery);
    radius = canvas.width < canvas.height ? canvas.width / 2 : canvas.height / 2;

    // Ok so this is not working. We should start with xpos = centerx
    // and ypos = centery, but for some reason it draws lines only up
    // to the first line pase the 0 degree line using cartesian coordinates
    // and then stops.
    // This does the same thing but this way we get more lines before this
    // happens.
    // The arc coordinates formula is from
    // http://mathforum.org/library/drmath/view/55327.html
    users[0].xpos = centerx - radius;
    users[0].ypos = centery;


    ctx.lineTo(users[0].xpos, users[0].ypos);
    ctx.stroke();
    var theta = 2 * Math.PI / num;
    var x = users[0].xpos, y = users[0].ypos;
    for (var i = 0; i < num; i++) {
        ctx.moveTo(centerx, centery);
        var B = Math.acos((users[i].xpos - centerx) / radius);
        if (isNaN(B)) throw "NAN";
        console.log("User " + i + " xpos " + x);
        x = centerx + radius * Math.cos(B - theta / 2);
        y = centery + radius * Math.sin(B - theta / 2);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#ff4444';
        ctx.stroke();
        ctx.moveTo(centerx, centery);
        console.log("Second x " + x);
        B = Math.acos((x - centerx) / radius);
        if (isNaN(B)) throw "NAN";

        x = centerx + radius * Math.cos(B - theta / 2);
        y = centery + radius * Math.sin(B - theta / 2);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#000000';
        ctx.stroke();

        if (i < num - 1) {
            users[i + 1].xpos = x;
            users[i + 1].ypos = y;
        }

    }
    for (var i in users) {
        console.log(users[i].name + "," + users[i].xpos + ", " + users[i].ypos);
    }

    ctx.beginPath();
    ctx.arc(centerx, centery, radius, 0, Math.PI * 2);
    ctx.stroke();
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
	drawSections(numUsers);
	messeges.unshift(new Messege(newMessage.user, newMessage.messege));
	for (var i = messeges.length - 1; i >= 0; i--) {
		ctx.fillText(messeges[i].user + ": " + messeges[i].messege, 10, .9*canvas.height - i*25);
	}
}