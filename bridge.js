var io = require('socket.io').listen(80);
var math = require('mathjs');

var radians = function(deg)
{
	return deg * (math.PI/180);
}

var phone = io
  .of('/phone')
  .on('connection', function (socket) {
    socket.on('client1',function(msg) {
  		console.log("client1:"+msg);
  		table.emit("client1T",msg);
  	});
  	socket.on('rotation',function(msg) {
  		console.log("rotation:"+JSON.stringify(msg));
  		/*msg.a = radians(msg.a);
  		msg.b = radians(msg.b+180);
  		msg.g = radians((msg.g+90)*2);*/
			/*msg.a = radians(msg.a);
			msg.b = radians(msg.b);
			msg.g = radians(msg.g);*/
  		table.emit("rotation",msg);
  	});
  });

var table = io
  .of('/table')
  .on('connection', function (socket) {
    socket.on('client2',function(msg) {
  		console.log("client2:"+msg);
  		phone.emit("client2T",msg);
  	});
  });