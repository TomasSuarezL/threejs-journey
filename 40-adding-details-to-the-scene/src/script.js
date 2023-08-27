import * as dat from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import firefliesVertexShader from "./shaders/fireflies/fireflies.vert";
import firefliesFragmentShader from "./shaders/fireflies/fireflies.frag";
import portalVertexShader from "./shaders/portal/portal.vert";
import portalFragmentShader from "./shaders/portal/portal.frag";

/**
 * Base
 */
// Debug
const gui = new dat.GUI({
  width: 400,
});

const debugObject = {
  clearColor: 0x014151,
};

gui.addColor(debugObject, "clearColor").onChange((v) => renderer.setClearColor(v));

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader();

// Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

// GLTF loader
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * Textures
 */
const bakedTexture = textureLoader.load("baked.jpg");
bakedTexture.flipY = false;
bakedTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Materials
 */
// Baked material
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture });

// Pole light material
const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 });

debugObject.portalColorStart = "#ff0000";
debugObject.portalColorEnd = "#0000ff";

gui.addColor(debugObject, "portalColorStart").onChange((value) => {
  portalLightMaterial.uniforms.uColorStart.value.set(value);
});

gui.addColor(debugObject, "portalColorEnd").onChange((value) => {
  portalLightMaterial.uniforms.uColorEnd.value.set(value);
});

// Portal light material
const portalLightMaterial = new THREE.ShaderMaterial({
  vertexShader: portalVertexShader,
  fragmentShader: portalFragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uColorStart: { value: new THREE.Color(debugObject.portalColorStart) },
    uColorEnd: { value: new THREE.Color(debugObject.portalColorEnd) },
  },
});

/**
 * Model
 */
gltfLoader.load("portal.glb", (gltf) => {
  scene.add(gltf.scene);

  gltf.scene.traverse((m) => {
    if (m.name.startsWith("PoleLight")) {
      m.material = poleLightMaterial;
    } else if (m.name.startsWith("PortalLight")) {
      m.material = portalLightMaterial;
    } else {
      m.material = bakedMaterial;
    }
  });
});

// Fireflies
const firefliesGeometry = new THREE.BufferGeometry();
const firefliesCount = 30;
const positionArray = new Float32Array(firefliesCount * 3);
const scaleArray = new Float32Array(firefliesCount);

for (let i = 0; i < firefliesCount; i++) {
  const i3 = i * 3;

  positionArray[i3] = (Math.random() - 0.5) * 4;
  positionArray[i3 + 1] = Math.random() * 1.5;
  positionArray[i3 + 2] = (Math.random() - 0.5) * 4;

  scaleArray[i] = Math.random() * 3;
}

firefliesGeometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3));
firefliesGeometry.setAttribute("aScale", new THREE.BufferAttribute(scaleArray, 1));

const firefliesMaterial = new THREE.ShaderMaterial({
  vertexShader: firefliesVertexShader,
  fragmentShader: firefliesFragmentShader,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  uniforms: {
    uTime: { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uSize: { value: 80 },
  },
});

const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial);
scene.add(fireflies);

gui.add(fireflies.material.uniforms.uSize, "value").min(0.1).max(500).step(0.1);

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

  fireflies.material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.x = -3.5;
camera.position.y = 3;
camera.position.z = -3.5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
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
renderer.setClearColor(debugObject.clearColor);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  fireflies.material.uniforms.uTime.value = elapsedTime;
  portalLightMaterial.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
