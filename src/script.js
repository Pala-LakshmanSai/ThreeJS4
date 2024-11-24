import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { color, shininess } from "three/webgpu";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

const scene = new THREE.Scene();

// initialize the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// initialize the material
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
});

const material2 = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  // transparent:true,
  // opacity: 0.2
});
material2.transparent = true;
material2.opacity = 0.9;
material2.color = new THREE.Color("red");
// initialize the mesh
const mesh = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material2);
scene.add(mesh2);
scene.add(mesh);
mesh2.position.x = 2;

const planeMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  transparent: true,
  opacity: 0.7,
});
const planeGeometry = new THREE.PlaneGeometry(2, 2, 2, 2);
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMaterial.side = THREE.DoubleSide;
planeMesh.position.x = -2;
scene.add(planeMesh);

planeMaterial.fog = false;

const fog = new THREE.Fog("white", 1, 30);
scene.fog = fog;

const axisHelper = new THREE.AxesHelper(2);
scene.add(axisHelper);
scene.background = new THREE.Color("blue");
// initialize the camera
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const material3 = new THREE.MeshLambertMaterial();
const geometry3 = new THREE.BoxGeometry(1, 0.5, 1);
const cubeMesh3 = new THREE.Mesh(geometry3, material3);

const light = new THREE.AmbientLight("white", 0.5);
// scene.add(light);

const pointlight = new THREE.PointLight("white", 0.1);
pointlight.position.set(-5, -5, 5);
scene.add(pointlight);

cubeMesh3.position.y = 1.1;
scene.add(cubeMesh3);

const material4 = new THREE.MeshPhongMaterial()
material4.shininess = 90;
material4.color = new THREE.Color("red")
const material5 = new  THREE.MeshStandardMaterial();
// initialize the scene
const torusknotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const torusMesh = new THREE.Mesh(torusknotGeometry, material5);
torusMesh.position.y = -1.5;
scene.add(torusMesh);


window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
