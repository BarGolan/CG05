import * as THREE from "three";
import { translateObject, rotateObject, scaleObject } from "./utils.js";

export function generateGoalKeeper() {
  const goalkeeper = new THREE.Group();

  const bodyGeometry = new THREE.BoxGeometry(1, 2, 0.5);
  const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  translateObject(body, 0, 1, 0);

  const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const headMaterial = new THREE.MeshBasicMaterial({ color: 0xffe0bd });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  translateObject(head, 0, 2.5, 0);

  const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  translateObject(leftEye, -0.15, 2.7, 0.45);

  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  translateObject(rightEye, 0.15, 2.7, 0.45);

  const armGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5);
  const armMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const leftArm = new THREE.Mesh(armGeometry, armMaterial);
  translateObject(leftArm, -0.75, 1.5, 0);
  rotateObject(leftArm, new THREE.Vector3(0, 0, 1), -45);

  const rightArm = new THREE.Mesh(armGeometry, armMaterial);
  translateObject(rightArm, 0.75, 1.5, 0);
  rotateObject(rightArm, new THREE.Vector3(0, 0, 1), 45);

  const gloveGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const gloveMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const leftGlove = new THREE.Mesh(gloveGeometry, gloveMaterial);
  translateObject(leftGlove,  -0.75, 2.5, 0);
  rotateObject(leftGlove, new THREE.Vector3(0, 0, 1), -45);

  const rightGlove = new THREE.Mesh(gloveGeometry, gloveMaterial);
  translateObject(rightGlove,  0.75, 2.5, 0);
  rotateObject(rightGlove, new THREE.Vector3(0, 0, 1), 45);

  const legGeometry = new THREE.CylinderGeometry(0.25, 0.25, 2);
  const legMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
  translateObject(leftLeg, -0.3, -1, 0);

  const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
  translateObject(rightLeg, 0.3, -1, 0);

  goalkeeper.add(
    body,
    head,
    leftEye,
    rightEye,
    leftArm,
    rightArm,
    leftGlove,
    rightGlove,
    leftLeg,
    rightLeg
  );
  translateObject(goalkeeper, 0, 1, 0);
  scaleObject(goalkeeper, 0.4);

  return goalkeeper;
}
