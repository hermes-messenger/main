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

function User() {
    // This stores the users name, and the position of the center of their
    // chat section, right along the circle's edge
    this.name="";
    this.xpos=-1;
    this.ypos=-1;

}
function createWindow(){
    ctx = canvas.getContext("2d");

    // create users with default name
    var numUsers = 5;
    users = new Array(numUsers);
    for(var i=1; i<=numUsers; i++ )
    {
        users[i-1] = new User();
        users[i-1].name = "Player " + i;
    }
    drawSections(numUsers);
}

function drawSections(num)
{
    var centerx = canvas.width/2;
    var centery = canvas.height/2;
    ctx.moveTo(centerx, centery);
    radius = canvas.width < canvas.height ? canvas.width/2 : canvas.height/2;

    // Ok so this is not working. We should start with xpos = centerx
    // and ypos = centery, but for some reason it draws lines only up
    // to the first line pase the 0 degree line using cartesian coordinates
    // and then stops.
    // This does the same thing but this way we get more lines before this
    // happens.
    // The arc coordinates formula is from
    // http://mathforum.org/library/drmath/view/55327.html
    users[0].xpos = centerx- radius;
    users[0].ypos = centery;


    ctx.lineTo(users[0].xpos,users[0].ypos); ctx.stroke();
    var theta = 2*Math.PI/num;
    var x = users[0].xpos, y = users[0].ypos;
    for(var i = 0; i< num; i++)
    {
        ctx.moveTo(centerx,centery);
        var B = Math.acos((users[i].xpos-centerx)/radius);
        if( isNaN(B) ) throw "NAN";
        console.log("User "+ i + " xpos " + x);
        x = centerx + radius*Math.cos(B-theta/2);
        y = centery + radius*Math.sin(B-theta/2);
        ctx.lineTo( x , y );  ctx.strokeStyle = '#ff4444'; ctx.stroke();
        ctx.moveTo(centerx,centery);
        console.log("Second x " + x);
        B = Math.acos((x - centerx) / radius);
        if( isNaN(B) ) throw "NAN";

        x = centerx + radius*Math.cos(B-theta/2);
        y = centery + radius*Math.sin(B-theta/2);
        ctx.lineTo(x, y);ctx.strokeStyle = '#000000'; ctx.stroke();

        if(i < num-1)
        {
            users[i+1].xpos = x;
            users[i+1].ypos = y;
        }

    }
    for( var i in users )
    {
        console.log(users[i].name + "," + users[i].xpos + ", "+ users[i].ypos);
    }

    ctx.beginPath();
    ctx.arc(centerx,centery,radius,0,Math.PI*2); ctx.stroke();
}