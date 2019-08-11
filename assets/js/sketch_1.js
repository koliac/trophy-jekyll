var global = {
	focalLength: 10
};
//establish gui for updating CameraControl properties
var gui = new dat.GUI();
gui.add(global, 'focalLength', 0, 200);


//basic scene, lighting, and a floor
var env = {
  renderer: new THREE.WebGLRenderer(
    {
      canvas:  document.querySelector('#stage'),
      antialias: true
    }
  ),
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera( global.focalLength, window.innerWidth / window.innerHeight, 0.1, 10000),
  cameraTrack: new THREE.Group(),
  lights: {
    ambient: new THREE.AmbientLight( 0x444444 ),
    directional: new THREE.DirectionalLight( 0xffeedd )
  },
  floor: {
    geom: new THREE.PlaneGeometry( 5, 5, 6, 6),
    material: new THREE.MeshBasicMaterial( {
      color: 0x444444,
    	wireframe: true
    })
  },
  volume: {
    geom: new THREE.BoxGeometry( 5, 5, 5 ),
    material: new THREE.MeshStandardMaterial(
      {
        color : 0x555555
      }
    )
  },
  target: new THREE.Vector3( 0, 1, 0 )
};

//Build Meshes
env.floor.mesh = new THREE.Mesh( env.floor.geom, env.floor.material );
env.volume.mesh = new THREE.Mesh( env.volume.geom, env.volume.material );

//Do Whatever to things that go in the Scene
env.cameraTrack.rotation.y = 0;
env.camera.position.z = 5.7;
env.camera.position.y = 1.6;
env.camera.lookAt(env.target);
env.lights.directional.position.set( 0, 0, 1 ).normalize();
env.volume.mesh.position.y = 2.5;
env.floor.mesh.rotation.x = 90 * Math.PI / 180  ;

//GUI controlled start values of the above object
gui.add(env.cameraTrack.rotation, "y", -3, 3);
gui.add(env.camera.position, "y", 0, 30);
gui.add(env.camera.position, "z", 1, 30);


//Add those things to the scene
env.cameraTrack.add(env.camera);
env.scene.add(env.cameraTrack);
env.scene.add(env.floor.mesh);
env.scene.add(env.volume.mesh);
env.scene.add(env.lights.ambient);
env.scene.add(env.lights.directional);

//render the scene
function render(){
  requestAnimationFrame(render);
  env.camera.setFocalLength(global.focalLength, 98);
  env.camera.lookAt(env.target);
  env.renderer.render(env.scene, env.camera);
}
render();

//put the renderer on the DOM
document.body.appendChild( env.renderer.domElement );

//respond to window resizing
function resize(){
  env.camera.aspect = window.innerWidth / window.innerHeight;
  env.camera.updateProjectionMatrix();
  env.renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener("resize", resize, false);
resize();
