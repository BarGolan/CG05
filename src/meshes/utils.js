export function translateObject(object, x, y, z) {
  const translateMatrix = new THREE.Matrix4();
  translateMatrix.makeTranslation(x, y, z);
  object.applyMatrix4(translateMatrix);
}

export function rotateObject(object, axis, angle) {
    const rotationMatrix = new THREE.Matrix4();
    rotationMatrix.makeRotationAxis(axis, degrees_to_radians(angle));
    object.applyMatrix4(rotationMatrix);
}

export function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}