import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

/**
 * Loaders
 */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
const rgbeLoader = new RGBELoader();
const textureLoader = new THREE.TextureLoader();

const floorColorTexture = textureLoader.load(
  "/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_diff_1k.jpg"
);
const floorAOMetalRoughTexture = textureLoader.load(
  "/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_arm_1k.jpg"
);
const floorNormalTexture = textureLoader.load(
  "/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_nor_gl_1k.png"
);

const wallColorTexture = textureLoader.load(
  "/textures/castle_brick_broken_06/castle_brick_broken_06_diff_1k.jpg"
);
const wallAOMetalRoughTexture = textureLoader.load(
  "/textures/castle_brick_broken_06/castle_brick_broken_06_arm_1k.jpg"
);
const wallNormalTexture = textureLoader.load(
  "/textures/castle_brick_broken_06/castle_brick_broken_06_nor_gl_1k.png"
);

/**
 * Base
 */
// Debug
const gui = new dat.GUI();
const global = {};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Update all materials
 */
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (child.isMesh && child.material.isMeshStandardMaterial) {
      child.material.envMapIntensity = global.envMapIntensity;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
};

/**
 * Environment map
 */
// Global intensity
global.envMapIntensity = 1;
gui.add(global, "envMapIntensity").min(0).max(10).step(0.001).onChange(updateAllMaterials);

// HDR (RGBE) equirectangular
rgbeLoader.load("/environmentMaps/0/2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = environmentMap;
  scene.environment = environmentMap;
});

// Lights

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-4, 6, 1);
scene.add(directionalLight);

gui.add(directionalLight, "intensity").min(0).max(10).step(0.01).name("lightIntensity");
gui.add(directionalLight.position, "x").min(-10).max(10).step(0.01).name("lightX");
gui.add(directionalLight.position, "y").min(-10).max(10).step(0.01).name("lightY");
gui.add(directionalLight.position, "z").min(-10).max(10).step(0.01).name("lightZ");

directionalLight.castShadow = true;

directionalLight.target.position.set(0, 4, 0);
directionalLight.target.updateWorldMatrix();

directionalLight.shadow.camera.far = 25;
directionalLight.shadow.mapSize.set(512, 512);

gui.add(directionalLight.shadow, "normalBias").min(-0.05).max(0.05).step(0.001);
gui.add(directionalLight.shadow, "bias").min(-0.05).max(0.05).step(0.001);

const directionalLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(directionalLightHelper);

/**
 * Models
 */
// Helmet
// gltfLoader.load("/models/FlightHelmet/glTF/FlightHelmet.gltf", (gltf) => {
//   gltf.scene.scale.set(10, 10, 10);
//   scene.add(gltf.scene);

//   updateAllMaterials();
// });

gltfLoader.load("/models/burga.glb", (gltf) => {
  gltf.scene.scale.set(0.4, 0.4, 0.4);
  gltf.scene.position.set(0, 2.5, 0);
  scene.add(gltf.scene);

  updateAllMaterials();
});

floorColorTexture.colorSpace = THREE.SRGBColorSpace;

const floorGeometry = new THREE.PlaneGeometry(8, 8);
const floorMaterial = new THREE.MeshStandardMaterial({
  map: floorColorTexture,
  aoMap: floorAOMetalRoughTexture,
  roughnessMap: floorAOMetalRoughTexture,
  metalnessMap: floorAOMetalRoughTexture,
  normalMap: floorNormalTexture,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;

scene.add(floor);

wallColorTexture.colorSpace = THREE.SRGBColorSpace;
const wallGeometry = new THREE.PlaneGeometry(8, 8);
const wallMaterial = new THREE.MeshStandardMaterial({
  map: wallColorTexture,
  normalMap: wallNormalTexture,
  aoMap: wallAOMetalRoughTexture,
  roughnessMap: wallAOMetalRoughTexture,
  metalnessMap: wallAOMetalRoughTexture,
});

const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.position.y = 4;
wall.position.z = -4;

scene.add(wall);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(4, 5, 4);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.y = 3.5;
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Tone mappings
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2;

gui.add(renderer, "toneMapping", {
  No: THREE.NoToneMapping,
  Linear: THREE.LinearToneMapping,
  Reinhard: THREE.ReinhardToneMapping,
  Cineon: THREE.CineonToneMapping,
  ACES: THREE.ACESFilmicToneMapping,
});

gui.add(renderer, "toneMappingExposure", 0, 20, 0.01);

renderer.useLegacyLights = false;
gui.add(renderer, "useLegacyLights");

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

/**
 * Animate
 */
const tick = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
