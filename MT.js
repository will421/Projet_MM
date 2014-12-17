define	( [ 'js/domReady'
		  , 'js/ALX_magictouch.js','js/socket.io-1.2.0.js','js/jquery-1.11.1.js',
		  ]
		, function(domReady) {

function init() {
	// On definie qu'elle division (html) on souhaite recuperer.
	var divpipoTouch = document.getElementById('pipoTouch');
        // Connexion avec le serveur table
	 var server = io.connect('192.168.173.1:8081/phone');
    
      server.on('client2T', function (msg) {
          // On vérifie si la connexion est okay
        console.log("Receivedfrom2:"+msg)
      });
	// Speech recognition
	if( window.SpeechRecognition || window.webkitSpeechRecognition ) {
                // Connexion
             
		 console.log("Speech recognition supported");
		 var bt = document.createElement('button');
                 bt.innerHTML = "Start speech recognition";
		 divpipoTouch.appendChild( bt );
		 bt.ontouchstart = function() {console.log("speech start");
								  reco.start();
								 };
                 var phrase_reconnue = "";
		 // reco.start();
		 var SpeechReco = window.SpeechRecognition || window.webkitSpeechRecognition;
		 var reco = new SpeechReco();
			 reco.continuous = true;
			 reco.interimResults = true;
			 reco.lang = "fr-FR";
                 
		 reco.onstart	= function() {
			 bt.innerHTML = "Stop speech recognition";
			 bt.ontouchstart = function() {reco.stop();};
			};
		 reco.onresult	= function(event) {
			 // console.log("Speech recognized:", event);
			 for (var i = event.resultIndex; i < event.results.length; ++i) {
				 // if (event.results[i].isFinal) {
					 console.log( event.results[i][0].transcript );
                                        phrase_reconnue = phrase_reconnue + " " + event.results[i][0].transcript ;
					//
                                        
				}
                                // attention a l'espace au début de le phrase.
                                    
                                switch(phrase_reconnue){
                                        
                                        case(" couleur rouge"):
                                          
                                            data= {a:"rouge"};
                                            server.emit("Vocal",data);
                                            break;
                                            
                                        case(" suprrimer"):
                                            data= {a:"delete"};
                                            server.emit("Vocal",data);
                                            break;

                            // attention a l'espace au début de le phrase.
                            
                                };  
                                    
                 };
		 reco.onerror	= function(event) {console.error("Speech recognizer error:", event);};
		 reco.onend		= function() {
			 bt.innerHTML = "Start speech recognition";
			 bt.ontouchstart = function() {reco.start();};
			};
		
		} else {console.error("Speech recognition is not supported");}
	
            
}
        
	domReady( init );

	return undefined;
});