define(['js/domReady',"mainThree"], function(domReady,mainThree) {
		//domReady(function(){
			var server = io.connect('http://localhost/table');
			
			server.on('client1T', function (msg) {
				console.log("Receivedfrom1:"+msg)
			});
			server.on('rotation',function(msg) {
				console.log("Rotation:"+JSON.stringify(msg));
				
				if(document.getElementById("axeX").checked){
					mainThree.object.rotation.x = msg.g; //avant-arriere
				}
				if(document.getElementById("axeY").checked){
					mainThree.object.rotation.y = msg.a; //gauche-droite
				}
				if(document.getElementById("axeZ").checked){
					mainThree.object.rotation.z = msg.b; //aiguilles d'une montre
				}
			});
		//});
  } );