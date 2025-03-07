import * as THREE from 'https://cdn.skypack.dev/three@0.136.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';
import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/ShaderPass.js';
import { DotScreenPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/DotScreenPass.js';
import { GlitchPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/GlitchPass.js';
import { GUI } from 'https://cdn.skypack.dev/dat.gui';
import { gsap } from 'https://cdn.skypack.dev/gsap@3.7.1';

let scene, camera, renderer, composer, bloomPass, noisePass, controls, sphere, glitchPass, dotScreenPass;
let guiParams = {
  deformAmount: 0.1,
  transparency: 0.5,
  iridescenceIntensity: 1.0,
  noiseStrength: 0.2,
  bloomStrength: 3,
  bloomRadius: 0.4,
  bloomThreshold: 0,
  activateGlitch: false,
  dotScale: 0.1,
  activateDotScreen: true
};

init();
animate();
createTitle();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 3);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(1, 16, 16);
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00, // Verde neon forte
    emissive: 0x00ff00, // Emissão de luz verde
    emissiveIntensity: 1.5, // Intensidade forte do brilho
    wireframe: true,
    transparent: true,
    opacity: guiParams.transparency
  });
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  // Efeito de Brilho Intenso
  bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight), 
    guiParams.bloomStrength, guiParams.bloomRadius, 
    guiParams.bloomThreshold);
  composer.addPass(bloomPass);

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.x += 0.001;
  sphere.rotation.y += 0.005;
  sphere.rotation.z += 0.001;

  controls.update();
  composer.render();
}

function createTitle() {
  const title = document.createElement('h3');
  title.textContent = 'Erick Barbosa Software Engineer';
  title.style.position = 'absolute';
  title.style.top = '20px';
  title.style.left = '30px';
  title.style.color = 'white';
  title.style.fontFamily = 'Arial, sans-serif';
  title.style.fontSize = '18px';
  document.body.appendChild(title);
}
