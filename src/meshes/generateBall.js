import * as THREE from "three";
import { translateObject } from "./utils.js";

export function generateBall() {
  let ballGeometry = new THREE.SphereGeometry(0.125, 32, 32);
  let ballMaterial = new THREE.MeshBasicMaterial({ color: 0xffaa11 });
  let ball = new THREE.Mesh(ballGeometry, ballMaterial);
  translateObject(ball, 0, 1.5, 2.5);

  return ball;
}
