define(['js/domReady',"order!js/three.min","order!js/CombinedCamera",
"order!js/Stats","order!js/Detector","order!js/OrbitControls"], function(domReady) {
	

var container, stats;
var renderer,scene,camera,controls
var cube,plane,line,object
var geometry,material;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


domReady(function () {
    //This function is called once the DOM is ready.
    //It will be safe to query the DOM and manipulate
    //DOM nodes in this function.
		
		// initialization
		init();
		animate();
		
});




function init() 
{
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	
	scene = new THREE.Scene();
	//camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera = new THREE.CombinedCamera(window.innerWidth, window.innerHeight, 70, 1, 2000, 1, 2000);
	camera.position.y = 250;
	camera.position.z = 500;
	camera.position.x = 200
	
	controls = new THREE.OrbitControls( camera );
	//controls.damping = 0.2;
	controls.addEventListener( 'change', render );
	
	
	
	//renderer
	// create and start the renderer; choose antialias setting.
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer(); 

	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( 0xf0f0f0 );

	container.appendChild( renderer.domElement );
	
	
// Cube

	var geometry = new THREE.BoxGeometry( 200, 200, 200 );

	for ( var i = 0; i < geometry.faces.length; i += 2 ) {

		var hex = Math.random() * 0xffffff;
		geometry.faces[ i ].color.setHex( hex );
		geometry.faces[ i + 1 ].color.setHex( hex );

	}

	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );

	cube = new THREE.Mesh( geometry, material );
	cube.position.y = 150;
	scene.add( cube );

	// Plane

	var geometry = new THREE.PlaneBufferGeometry( 200, 200 );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

	var material = new THREE.MeshBasicMaterial( { color: 0xe0e0e0, overdraw: 0.5 } );

	plane = new THREE.Mesh( geometry, material );
	scene.add( plane );
	
	
	
	
	///////////
	// STATS //
	///////////
	
	// displays current and past frames per second attained by scene
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );
}

function animate() 
{
  requestAnimationFrame( animate );
	render();
	update();
}


function render() {
	//cube.rotation.x += 0.1;
	//cube.rotation.y += 0.1;

	renderer.render( scene, camera );
}

function update()
{
	stats.update();
}



return {"object":cube,"camera":camera}

} );


