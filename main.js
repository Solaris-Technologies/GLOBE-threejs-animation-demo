import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// Setup Scene
const scene = new THREE.Scene();

// Setup Camera (PerspectiveCamera)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Setup Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// Set size (whole window)
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Appling Light effects on object

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(6, 6, 6);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Background
const spaceTexture = new THREE.TextureLoader().load('/textures/coding-space.jpg');
scene.background = spaceTexture;


// Add texture
const globeTexture = new THREE.TextureLoader().load('/textures/coding-mat.jpg');
const normalTexture = new THREE.TextureLoader().load('/textures/normal.jpg');

// Create geometry and material with texture
const globe = new THREE.Mesh(
  new THREE.SphereGeometry(3, 25, 25),
  new THREE.MeshStandardMaterial({
    map: globeTexture,
    normalMap: normalTexture,
  })
);

scene.add(globe);

globe.position.y = 0;
globe.position.z = 20;
globe.position.setX(5);

// Draw the scene every time the screen is refreshed
function animate() {
  requestAnimationFrame(animate);

  // Rotate objects (Change values to change speed)
  globe.rotation.x += 0.005;

  renderer.render(scene, camera);
}

// Function to make page responssive
function onWindowResize() {
	// Camera frustum aspect ratio
	camera.aspect = window.innerWidth / window.innerHeight;
	// After making changes to aspect
	camera.updateProjectionMatrix();
	// Reset size
	renderer.setSize(window.innerWidth, window.innerHeight);
}
// Calling EventListener
window.addEventListener('resize', onWindowResize, false);

animate();
