define(['js/domReady',"mainThree"], function(domReady,mainThree) {
		//domReady(function(){
			var server = io.connect('http://localhost/table');
			
			server.on('client1T', function (msg) {
				console.log("Receivedfrom1:"+msg)
			});
                  
                        // Desactiver juste pour tester la commande vocale
			server.on('rotation',function(msg) {
				console.log("Rotation:"+JSON.stringify(msg));
				
				if(document.getElementById("axeX").checked){
                                    pass;
                                    mainThree.object.rotation.x = msg.g; //avant-arriere
				}
				if(document.getElementById("axeY").checked){
                                    mainThree.object.rotation.y = msg.a; //gauche-droite
				}
				if(document.getElementById("axeZ").checked){
                                    pass;
        				mainThree.object.rotation.z = msg.b; //aiguilles d'une montre
				}
			});
                        
                        server.on('Vocal',function(msg){
                            
                            if(msg.a == "rouge"){
                                //Pour test
                                mainThree.object.rotation.y += 0.1;
                            }
                            if (msg.a = "delete"){
                            
                                mainThree.object.visible = false;
                                }
                            if (msg.a = "")
                                pass;
                            })
                            
		//});
  } );