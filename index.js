import * as THREE from "three";

const canvas = document.querySelector("canvas");
const scene = new THREE.Scene();
const box = new THREE.BoxGeometry(1, 1, 1);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
scene.add(
  new THREE.Mesh(box, new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
);
scene.add(camera);
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
