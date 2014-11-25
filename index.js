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

var numUsers;
function createUsers(){

    // create users with default name
    numUsers = 6;
    users = new Array(numUsers);

    for(var i=1; i<=numUsers; i++ )
    {
        users[i-1] = new User();
        users[i-1].name = "Player " + i;
    }
    users[0].xpos = canvas.width  /  2;
    users[0].ypos = canvas.height - 10;
    users[1].xpos = canvas.width      ;
    users[1].ypos = canvas.height - 10;
    users[2].xpos = canvas.width      ;
    users[2].ypos =                  0;
    users[3].xpos = canvas.width  /  2;
    users[3].ypos =                  0;
    users[4].xpos =                  0;
    users[4].ypos =                  0;
    users[5].xpos =                  0;
    users[5].ypos = canvas.height - 10;

createUserContainers()



}

function drawUsers(){
    ctx.font= "30px Verdana";

    ctx.fillStyle = '#FF0000';
    ctx.fillText(users[0].name, users[0].xpos-30, users[0].ypos-40);
    ctx.fillStyle = '#00FF00';
    ctx.fillText(users[1].name, users[1].xpos-130, users[1].ypos-40);
    ctx.fillStyle = '#0000FF';
    ctx.fillText(users[2].name, users[2].xpos-130, users[2].ypos+30);
    ctx.fillStyle = '#CCCC00';
    ctx.fillText(users[3].name, users[3].xpos -50, users[3].ypos+30);
    ctx.fillStyle = '#FF0066';
    ctx.fillText(users[4].name, users[4].xpos, users[4].ypos+30);
    ctx.fillStyle = '#000000';
    ctx.fillText(users[5].name, users[5].xpos, users[5].ypos-40);
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
    drawUsers();
   // drawHistoryLines();
}
function drawHistoryLines()
{
    if(!Messages[0]) {
        return;
    }
    console.log(Messages[0]);
    var el = $("#"+Messages[0].element);
    var offset = el.offset();
    if(!offset)
    {
        console.log('no offset');
        return;
    }
    ctx.beginPath();
    ctx.moveTo(offset.left, offset.top);
    for(var m in Messages)
    {
        el = $("#"+ Messages[m].element);
        offset = el.offset();
        ctx.lineTo(offset.left, offset.top);
        ctx.moveTo(offset.left, offset.top);
    }
    ctx.stroke();
}


var MessageToSend = "";
function sendMessage(event){
	if (event.keyCode == 13){
		MessageToSend = document.getElementById('input_text').value;
		if(MessageToSend != ""){
			document.getElementById('input_text').value = "";
			socket.emit('sendMessage', MessageToSend);
		}
	} 
}

socket.on('whateverServerMessage', onBlahBlah);
socket.on('addMessage', onAddMessage);

var name = "";
function onBlahBlah(dataFromServer){
	name = prompt(dataFromServer.Message, "");
	if (name != null) {
	    socket.emit('userInitialized', name);
	}
	else{
		socket.emit('userInitialized', "Anonymous");
	}
}

// Class for Messejs
function Message(user, message, id){
	this.user = user;
	this.message = message;
    this.element = id;
}

var Messages = [];
var id = 0;
var name2 = "", name3 = "", name4 = "", name5 = "", name6 = "";
function onAddMessage(newMessage){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    Messages.unshift(new Message(newMessage.user, newMessage.message,++id));
    if(newMessage.user == name){
        users[0].name = newMessage.user;
        createBubble(1,newMessage.message,id);
    }
    else if(name2 == "" || name2 == newMessage.user){
        users[1].name = newMessage.user;
        name2 = newMessage.user;
        createBubble(2,newMessage.message,id);
    }
    else if(name3 == "" || name3 == newMessage.user){
        users[2].name = newMessage.user;
        name3 = newMessage.user;
        createBubble(3,newMessage.message,id);
    }
    else if(name4 == "" || name4 == newMessage.user){
        users[3].name = newMessage.user;
        name4 = newMessage.user;
        createBubble(4,newMessage.message,id);
    }
    else if(name5 == "" || name5 == newMessage.user){
        users[4].name = newMessage.user;
        name5 = newMessage.user;
        createBubble(5,newMessage.message,id);
    }
    else if(name6 == "" || name6 == newMessage.user){
        users[5].name = newMessage.user;
        name6 = newMessage.user;
        createBubble(6,newMessage.message,id);
    }
    mannyDraw();


	/*for (var i = Messages.length - 1; i >= 0; i--) {
        console.log(Messages[i].user + ": " + Messages[i].message);
		ctx.fillText(Messages[i].user + ": " + Messages[i].message, 10, .9*canvas.height - i*25);
	}*/
}


// Initialize Events.
        function LoadEvents() {
            // Just testing movements...
            var c=0;
            // select user one's triangle border and on click, animate 
    $(".user1").children().click(function(){
        $(this).stop().animate({left: ++c%2*100 }, 'fast');
    });  
        }

        function createBubble(user, message,id)
        {

            $('.user'+1).children().animate({left: '-='+ 0, top: '-='+ 40, opacity:"-=0.2"},'fast');
            $('.user'+2).children().animate({left: '-='+ 40, top: '-='+ 40, opacity:"-=0.2"},'fast');
            $('.user'+3).children().animate({left: '-='+ 40, top: '+='+ 40, opacity:"-=0.2"},'fast');
            $('.user'+4).children().animate({left: '+='+ 0, top: '+='+ 40, opacity:"-=0.2"},'fast');
            $('.user'+5).children().animate({left: '+='+ 40, top: '+='+ 40, opacity:"-=0.2"},'fast');
            $('.user'+6).children().animate({left: '+='+ 40, top: '-='+ 40, opacity:"-=0.2"},'fast');

            if(user==3 || user==4 || user==5){
                $('<p/>', {
                "class": 'triangle-border top' ,
                id: id,
                text: message,
            }).appendTo('.user'+user);
            }
            else
            {
            $('<p/>', {
                "class": 'triangle-border' ,
                id: id,
                text: message,
            }).appendTo('.user'+user);
        }


        }

function fadeChild()
{
    $(this).fadeTo(0.25,$(this).css('opacity')-0.25);

}

function createUserContainers()
{


        $('<div/>', {
        "class": 'user1',
            }).appendTo('#body');

        $('.user1').css({ 
    position: "absolute",
    top: canvas.height*1/2, 
    left: canvas.width*1/3,
    width: canvas.width*1/3,
    height: users[0].ypos/2
}).appendTo('body');

    
        $('<div/>', {
        "class": 'user2',
            }).appendTo('#body');

        $('.user2').css({ 
    position: "absolute",
    top: canvas.height*1/2, 
    left: canvas.width*2/3,
    width: canvas.width*1/3,
    height: users[0].ypos/2
}).appendTo('body');


    
        $('<div/>', {
        "class": 'user3',
            }).appendTo('#body');

        $('.user3').css({ 
    position: "absolute",
    top: 0, 
    left: canvas.width*2/3,
    width: canvas.width*1/3,
    height: users[0].ypos/2
}).appendTo('body');


    
        $('<div/>', {
        "class": 'user4',
            }).appendTo('#body');

        $('.user4').css({ 
    position: "absolute",
    top: 0, 
    left: canvas.width*1/3,
    width: canvas.width*1/3,
    height: users[0].ypos/2
}).appendTo('body');


    
        $('<div/>', {
        "class": 'user5',
            }).appendTo('#body');

        $('.user5').css({ 
    position: "absolute",
    top: 0, 
    left: 0,
    width: canvas.width*1/3,
    height: users[0].ypos/2
}).appendTo('body');


    
        $('<div/>', {
        "class": 'user6',
            }).appendTo('#body');

        $('.user6').css({ 
    position: "absolute",
    top: canvas.height*1/2, 
    left: 0,
    width: canvas.width*1/3,
    height: users[0].ypos/2
}).appendTo('body');

}