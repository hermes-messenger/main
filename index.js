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

socket.on('whateverServerMessege', onBlahBlah);
socket.on('newUser', onNewUser);
socket.on('userLeft', onUserLeft);

function onBlahBlah(dataFromServer){
	ctx.fillText(dataFromServer.messege + " from " + dataFromServer.name, 50, 100);
}

function onNewUser(data){
	ctx.fillText("Someone new has joined!", 50, 150);
}

function onUserLeft(data){
	ctx.fillText("Someone new has joined!", 50, 200);
}