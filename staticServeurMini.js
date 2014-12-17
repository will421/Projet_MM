var RRServer = {
	  express		: require('express')
	, bodyParser	: require("body-parser")
	, multer		: require('multer')
	, app			: null
	, init			: function(port) {
		 var self = this;
		 
		// HTTP server
		 this.app	  = this.express();
		 this.server  = this.app.use( this.express.static(__dirname) )
								.use( this.bodyParser.urlencoded({ extended: false }) )
								.use( this.bodyParser.json() )
								.use( this.multer({ dest: './uploads/'}) )
								.listen(port);
		var io = require('socket.io')(this.server);
		var math = require('mathjs');
		
		var radians = function(deg)
		{
			return deg * (math.PI/180);
		}
		
		var state = 1; //1 if screen up and 0 if screen down
		var lastGamma = 0
		
		function dealWithGamma(gamma)
		{
			if(math.abs(gamma-lastGamma)>130)
			{
				state = (state+1)%2;
				console.log("*****************");
				console.log("***State change to "+state+" **");
				console.log("*****************");
			}
			lastGamma = gamma
		
			if(state==1)
			{
				return gamma
			}
			else
			{
				return gamma+180
			}
		
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
                                
                                msg.a = radians(msg.a);
                                msg.g = radians(dealWithGamma(msg.g));

                                msg.b = radians(msg.b);

                                        table.emit("rotation",msg);
			});
                        socket.on('Vocal',function(msg){
                            console.log("Vocal"+msg );
                            table.emit("Vocal",msg);
                        })
		  });

		var table = io
		  .of('/table')
		  .on('connection', function (socket) {
			socket.on('client2',function(msg) {
				console.log("client2:"+msg);
				phone.emit("client2T",msg);
			});
		  });
		
		}
};

var params = {}, p;
for(var i=2; i<process.argv.length; i++) {
	p = process.argv[i].split(':');
	params[p[0]] = p[1];
}

var port = params.port || 8081;
console.log("Usage :\n\tnode staticServeur.js [port:PORT]\n\tDefault port is 8081.");
console.log("HTTP server listening on port " + port);
RRServer.init( port );
