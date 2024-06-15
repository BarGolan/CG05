import * as THREE from "three";
import { OrbitControls } from "./OrbitControls.js";

// ====================== Build Scene ======================

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color("ForestGreen");

const goal = generateGoal();
let goalKeeper = generateGoalKeeper();
const ball = generateBall();
scene.add(goal);
scene.add(ball);

const cameraTranslate = new THREE.Matrix4();
cameraTranslate.makeTranslation(0, 2, 5);
camera.applyMatrix4(cameraTranslate);

renderer.render(scene, camera);

// ====================== Controls ======================

const controls = new OrbitControls(camera, renderer.domElement);

let isOrbitEnabled = true;
let isBallToGoalMovementFirstAxis = false;
let isBallToGoalMovementSecondAxis = false;
let initialPathRadius = 0.015;
let ballGoalDirectionSpeed = 1;
let ballGoalDirectionAngle = 0;
let displayGoalKeeper = false;

const moveBallToGoalFirstAxis = () => {
  if (!isBallToGoalMovementFirstAxis) return;
  for (let i = 0; i < ballGoalDirectionSpeed; i++) {
    translateObject(
      ball,
      0,
      -initialPathRadius * Math.cos(ballGoalDirectionAngle),
      -initialPathRadius * Math.sin(ballGoalDirectionAngle)
    );
    ballGoalDirectionAngle += 0.01;
  }
};

const moveBallToGoalSecondAxis = () => {
  if (!isBallToGoalMovementSecondAxis) return;
  for (let i = 0; i < ballGoalDirectionSpeed; i++) {
    translateObject(
      ball,
      -initialPathRadius * Math.cos(ballGoalDirectionAngle),
      0,
      -initialPathRadius * Math.sin(ballGoalDirectionAngle)
    );
    ballGoalDirectionAngle += 0.01;
  }
};

controls.update();

// ====================== Animate ======================

function animate() {
  requestAnimationFrame(animate);
  moveBallToGoalFirstAxis();
  moveBallToGoalSecondAxis();
  controls.enabled = isOrbitEnabled;
  controls.update();
  renderer.render(scene, camera);
}
animate();

// ====================== Event Listeners ======================

const keyDownHandler = (e) => {
  if (e.key === "o") {
    isOrbitEnabled = !isOrbitEnabled;
  } else if (e.key === "1") {
    isBallToGoalMovementFirstAxis = !isBallToGoalMovementFirstAxis;
  } else if (e.key === "2") {
    isBallToGoalMovementSecondAxis = !isBallToGoalMovementSecondAxis;
  } else if (e.key === "3") {
    scaleObject(goal, 0.95, 0.95, 0.95);
  } else if (e.key === "ArrowDown") {
    ballGoalDirectionSpeed = Math.max(0, ballGoalDirectionSpeed - 1);
  } else if (e.key === "ArrowUp") {
    ballGoalDirectionSpeed += 1;
  } else if (e.key === "w") {
    toggleWireframe(scene);
  } else if (e.key === "g") {
    displayGoalKeeper = !displayGoalKeeper;
    displayGoalKeeper ? scene.add(goalKeeper) : scene.remove(goalKeeper);
  }
};

document.addEventListener("keydown", keyDownHandler);

// ====================== Generate Goal Keeper ======================

function generateGoalKeeper() {
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
  translateObject(leftGlove, -0.75, 2.5, 0);
  rotateObject(leftGlove, new THREE.Vector3(0, 0, 1), -45);

  const rightGlove = new THREE.Mesh(gloveGeometry, gloveMaterial);
  translateObject(rightGlove, 0.75, 2.5, 0);
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
  scaleObject(goalkeeper, 0.4, 0.4, 0.4);

  return goalkeeper;
}

// ====================== Generate Goal =============================

function generateGoal() {
  const goal = new THREE.Group();

  let material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  let goalpostGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 32);
  let crossbarGeometry = new THREE.CylinderGeometry(0.1, 0.1, 6, 32);
  let goalPostRingGeometry = new THREE.SphereGeometry(0.2, 32, 32);
  let backSupportGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2.3, 32);
  let netGeometry = new THREE.PlaneGeometry(6, 2.3);

  let leftPostRing = new THREE.Mesh(goalPostRingGeometry, material);
  scaleObject(leftPostRing, 1, 0.2, 1);
  translateObject(leftPostRing, -3, 0, 0);

  let leftPost = new THREE.Mesh(goalpostGeometry, material);
  translateObject(leftPost, -3, 1, 0);

  let rightPostRing = new THREE.Mesh(goalPostRingGeometry, material);
  scaleObject(rightPostRing, 1, 0.2, 1);
  translateObject(rightPostRing, 3, 0, 0);

  let rightPost = new THREE.Mesh(goalpostGeometry, material);
  translateObject(rightPost, 3, 1, 0);

  let crossbar = new THREE.Mesh(crossbarGeometry, material);
  rotateObject(crossbar, new THREE.Vector3(0, 0, 1), 90);
  translateObject(crossbar, 0, 2, 0);

  let leftBackSupportRing = new THREE.Mesh(goalPostRingGeometry, material);
  scaleObject(leftBackSupportRing, 1, 0.2, 1);
  translateObject(leftBackSupportRing, -3, 0, -1.2);

  let leftBackSupport = new THREE.Mesh(backSupportGeometry, material);
  rotateObject(leftBackSupport, new THREE.Vector3(1, 0, 0), 30);
  translateObject(leftBackSupport, -3, 1, -0.6);

  let rightBackSupportRing = new THREE.Mesh(goalPostRingGeometry, material);
  scaleObject(rightBackSupportRing, 1, 0.2, 1);
  translateObject(rightBackSupportRing, 3, 0, -1.2);

  let rightBackSupport = new THREE.Mesh(backSupportGeometry, material);
  rotateObject(rightBackSupport, new THREE.Vector3(1, 0, 0), 30);
  translateObject(rightBackSupport, 3, 1, -0.6);

  let netMaterial = new THREE.MeshBasicMaterial({
    color: 0xd3d3d3,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
  });

  let backNet = new THREE.Mesh(netGeometry, netMaterial);
  rotateObject(backNet, new THREE.Vector3(1, 0, 0), 30);
  translateObject(backNet, 0, 0.95, -0.6);

  const vertices = new Float32Array([
    0,
    0,
    0, // Vertex 1
    0,
    2,
    0, // Vertex 2
    0,
    0,
    -1.2, // Vertex 3
  ]);
  let triangleGeometry = new THREE.BufferGeometry();
  triangleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(vertices, 3)
  );

  let leftNet = new THREE.Mesh(triangleGeometry, netMaterial);
  translateObject(leftNet, -3, 0, 0);

  let rightNet = new THREE.Mesh(triangleGeometry, netMaterial);
  translateObject(rightNet, 3, 0, 0);

  return goal.add(
    leftPost,
    leftPostRing,
    rightPost,
    rightPostRing,
    crossbar,
    leftBackSupportRing,
    leftBackSupport,
    rightBackSupportRing,
    rightBackSupport,
    backNet,
    leftNet,
    rightNet
  );
}

// ====================== Generate Ball =============================

function generateBall() {
  let ballGeometry = new THREE.SphereGeometry(0.125, 32, 32);
  let ballMaterial = new THREE.MeshBasicMaterial({ color: 0xffaa11 });
  let ball = new THREE.Mesh(ballGeometry, ballMaterial);
  translateObject(ball, 0, 1.5, 2.5);

  return ball;
}

// ====================== Utils =============================

function translateObject(object, x, y, z) {
  const translateMatrix = new THREE.Matrix4();
  translateMatrix.makeTranslation(x, y, z);
  object.applyMatrix4(translateMatrix);
}

function rotateObject(object, axis, angle) {
  const rotationMatrix = new THREE.Matrix4();
  rotationMatrix.makeRotationAxis(axis, degrees_to_radians(angle));
  object.applyMatrix4(rotationMatrix);
}

function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

function toggleWireframe(scene) {
  scene.traverse((object) => {
    if (object.isMesh) {
      object.material.wireframe = !object.material.wireframe;
    }
  });
}

function scaleObject(object, xFactor, yFactor, zFactor) {
  const scaleMatrix = new THREE.Matrix4();
  scaleMatrix.makeScale(xFactor, yFactor, zFactor);
  object.applyMatrix4(scaleMatrix);
}
