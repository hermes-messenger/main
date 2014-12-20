		// io() By default it tries to connect to the host that serves the page
		var socket = io.connect('/', {
				'reconnection delay': 100, // defaults to 500
				'reconnection limit': 100, // defaults to Infinity
				'max reconnection attempts': Infinity // defaults to 10
			  });
			  
		var myMe={};
		var myOpTypes=[{}];

		// inits
		$(function() {
			$('#statusBox').hide();
			socket.on('ServerMsg', promptName);
			
			/*
			socket.on('getTags',function(tags){
				$("#m").autocomplete({
				source: tags
				});
			});*/
		});
			function promptName(fromServer)
				{
					bootbox.prompt(fromServer, function(result) {                
					  if (result === null) {
						myMe=new me("anon","#0");
						socket.emit('initUser', myMe);                              
					  } else {
						myMe=new me(result,"#0");
						socket.emit('initUser', myMe);                          
					  }
					});
				} 
					
		
		/* When you is typing event */
		var typing = false;  
		var timeout = undefined;

		function timeoutFunction() {  
		  typing = false;
		  socket.emit("typing", false);
		}

		$('#m').keypress(function(e){
		if(e.which != 13)
		{
			if(typing===false && $('#m').is(":focus")){
				typing=true;
				socket.emit('typing',true);
				
			}else{
			clearTimeout(timeout);
			timeout = setTimeout(timeoutFunction, 500);
			}
		}
		});
		/*--*/
		

		/* When others are typing event */
		socket.on("isTyping",function(PersonTypingObj){
		if(PersonTypingObj.isTyping)
		{
			if($("#"+PersonTypingObj.person+"").length === 0)
			{
				$("body").append("<li id='"+ PersonTypingObj.person +"'><span class='text-muted'><small><i class='fa fa-keyboard-o'></i>" + PersonTypingObj.person + " is typing.</small></li>");
				timeout = setTimeout(timeoutFunction, 500);
			}
			else{
			$("#"+PersonTypingObj.person+"").remove();
			}
		}
		});
		
		// You sending message
		$('form').submit(function(){
			sendToAll();
			return false;
		});
		
		function sendToAll(){
		if($("#m").val() != ""){
				socket.emit('chat message', visual_sendMessage("all"));}
		}
		
		function sendToUser(){
		if($("#m").val() != "")
		{
		console.log("executed");
			$("#messages").click(function(e){
			console.log(e.target.id);
			socket.emit('chat message', visual_sendMessage(e.target.id));
			});
			
			}
		}
		
		socket.on('userC', function(text){
		visual_statusMessage(text);
		});
		socket.on('userD', function(text){
		visual_statusMessage(text);
		});
		
		
		socket.on('greetUser',function(greet){
			visual_greetUser(greet);
		});
		
		socket.on('dismissUser',function(dismiss){
			visual_dismissUser(dismiss);
		});
		
		socket.on('msgTypeOps',function(server_opTypes){
		
			myOpTypes=server_opTypes;
			
		});
		
		//recieve messages
		socket.on('chat message', function(message){
			visual_getMessage(message,myOpTypes);
			visual_userTyping(message);
		});
	  	  
		socket.on('disconnect', function(){	
			visual_disconnect();
			window.location.reload();
			});