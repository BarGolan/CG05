import * as THREE from "three";
import { generateGoal } from "./meshes/generateGoal.js";
import { generateBall } from "./meshes/generateBall.js";
import { toggleWireframe, translateObject } from "./meshes/utils.js";
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
goal.map((object) => scene.add(object));
const ball = generateBall();
scene.add(ball);

toggleWireframe(scene);

const cameraTranslate = new THREE.Matrix4();
cameraTranslate.makeTranslation(0, 0, 5);
camera.applyMatrix4(cameraTranslate);

renderer.render(scene, camera);

// ====================== Controls ======================

const controls = new OrbitControls(camera, renderer.domElement);

let isOrbitEnabled = true;
let isBallToGoalMovementFirstAxis = false;
let isBallToGoalMovementSecondAxis = false;
let radiusBallToGoal = 0.015;
let ballGoalDirectionSpeed = 1;
let ballGoalDirectionAngle = 0;

const moveBallToGoalFirstAxis = () => {
  if (!isBallToGoalMovementFirstAxis) return;
  translateObject(
    ball,
    0,
    -ballGoalDirectionSpeed *
      radiusBallToGoal *
      Math.cos(ballGoalDirectionAngle),
    -ballGoalDirectionSpeed *
      radiusBallToGoal *
      Math.sin(ballGoalDirectionAngle)
  );
  ballGoalDirectionAngle += 0.01;
};

const moveBallToGoalSecondAxis = () => {
  if (!isBallToGoalMovementSecondAxis) return;
  translateObject(
    ball,
    -ballGoalDirectionSpeed *
      radiusBallToGoal *
      Math.cos(ballGoalDirectionAngle),
    0,
    -ballGoalDirectionSpeed *
      radiusBallToGoal *
      Math.sin(ballGoalDirectionAngle)
  );
  ballGoalDirectionAngle += 0.01;
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
  console.log(e.key);
  if (e.key === "o") {
    isOrbitEnabled = !isOrbitEnabled;
  } else if (e.key === "1") {
    isBallToGoalMovementFirstAxis = !isBallToGoalMovementFirstAxis;
  } else if (e.key === "2") {
    isBallToGoalMovementSecondAxis = !isBallToGoalMovementSecondAxis;
  } else if (e.key === "ArrowDown") {
    ballGoalDirectionSpeed -= 0.05;
    ballGoalDirectionAngle += 0.1;
  } else if (e.key === "ArrowUp") {
    ballGoalDirectionSpeed += 0.05;
    ballGoalDirectionAngle += 0.1;
  } else if (e.key === "w") {
    toggleWireframe(scene);
  }
};

document.addEventListener("keydown", keyDownHandler);
