import * as THREE from "three";
import { translateObject, rotateObject } from "./utils.js";

export function generateGoal() {
  // Goal posts and crossbar
  let material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  let goalpostGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
  let crossbarGeometry = new THREE.CylinderGeometry(0.1, 0.1, 6, 32);

  let leftPost = new THREE.Mesh(goalpostGeometry, material);
  translateObject(leftPost, -3, 1, 0);

  let rightPost = new THREE.Mesh(goalpostGeometry, material);
  translateObject(rightPost, 3, 1, 0);

  let crossbar = new THREE.Mesh(crossbarGeometry, material);
  rotateObject(crossbar, new THREE.Vector3(0, 0, 1), 90);
  translateObject(crossbar, 0, 2, 0);

  // Back supports
  let backSupportGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2.3, 32);
  let leftBackSupport = new THREE.Mesh(backSupportGeometry, material);
  rotateObject(leftBackSupport, new THREE.Vector3(1, 0, 0), 30);
  translateObject(leftBackSupport, -3, 1, -0.6);

  let rightBackSupport = new THREE.Mesh(backSupportGeometry, material);
  rotateObject(rightBackSupport, new THREE.Vector3(1, 0, 0), 30);
  translateObject(rightBackSupport, 3, 1, -0.6);

  // Nets
  let netMaterial = new THREE.MeshBasicMaterial({
    color: 0xd3d3d3,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
  });
  let netGeometry = new THREE.PlaneGeometry(6, 2.3);

  let backNet = new THREE.Mesh(netGeometry, netMaterial);
  rotateObject(backNet, new THREE.Vector3(1, 0, 0), 30);
  translateObject(backNet, 0, 0.95, -0.6);

  const vertices = new Float32Array([
    0, 0, 0,  // Vertex 1
    0, 2, 0, // Vertex 2
    0, 0, -1.2   // Vertex 3
]);
  let triangleGeometry = new THREE.BufferGeometry();
  triangleGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

  let leftNet = new THREE.Mesh(triangleGeometry, netMaterial);
  translateObject(leftNet, -3, 0, 0);

  let rightNet = new THREE.Mesh(triangleGeometry, netMaterial);
  translateObject(rightNet, 3, 0, 0);

  return [
    leftPost,
    rightPost,
    crossbar,
    leftBackSupport,
    rightBackSupport,
    backNet,
    leftNet,
    rightNet,
  ];
}
