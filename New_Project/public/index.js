/* Functions & Helpers More related to what the browser needs to know
	I.E. Indepednent from  io.socket 
*/

/* Non-Visual Functions */


/* Visual Functions */
function visual_greetUser(greet)
{
$('#messages').append($('<p>').text(greet));
}

function visual_sendMessage(to)
{
	var result = new message(myMe.name,-1,to,$('#m').val());
	$('#m').val('');
	return result;
}

function visual_getMessage(message, opTypes){
	if(message.to_id != "all"){

	$('#'+message.to_id).append($('<li>').attr({
		'class':'list-group-item',
		'id':message.from_id
		}).text(message.from_user+": "+message.msg));

	}else{
	$('#messages').append($('<li>').attr({
		'class':'list-group-item',
		'id':message.from_id
		}).text(message.from_user+": "+message.msg));
	}
	if(opTypes[message.type].visual != "" || !(opTypes[message.type].visual === null)){
	$('#'+message.from_id).prepend($('<span>').attr({'class':'badge'}).text(opTypes[message.type].visual));
	}
	if(opTypes[message.type].reply){
	$('#'+message.from_id).bind('click',sendToUser);
	}
}

function visual_userTyping(message){
		    $("#"+message.from_user+"").remove();
			clearTimeout(timeout);
			timeout = setTimeout(timeoutFunction, 0);
}

function visual_dismissUser(dismiss){
$('#messages').append($('<p>').text(dismiss));
}

function visual_disconnect(){
$('#messages').append($('<p>').text(("You've been disconnected. Sorry! We'll reconnect you the moment.")));
}

function visual_statusMessage(message){
console.log(message);
$('#statusBox').text(message);
$('#statusBox').fadeIn('slow').delay(5000).fadeOut('slow');
}

/* CLASSES AKA OBJECTS */

/* 
In all reality, these aren't needed, but I making objects look like classes.
This is where you will find all the client 'classes'

I had a tough time determining where should the work load go server or client?

So I decided to distribute it evenly - Have the server provide the data, have the server process the data.

So this file is ultimately the functions for 'browser processing'
*/
		// me class
function me(name,color)
		{
			this.name=name;
			this.color="#0";
		}
		// message class
function message(_fromU,_fromI,_toI,_msg)
		{ 
			this.msg=_msg;
			this.from_user=_fromU;
			//msg id
			this.from_id=_fromI;
			this.to_id=_toI
			this.type= getType(_msg,{});
		}
		// helpers for message
		function getType(__msg,data)
		{
			// should have a foreach loop going here or maybe a better way to parse the string
			if(__msg.slice(-1) == "?"){ 
			result="question";
			}else{
			result="normal";
			}
			
			return result;
		}