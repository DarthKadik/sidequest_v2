import * as THREE from "three";

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Increased intensity to 2.5
directionalLight.position.set(0, 15, 0); // Position directly above
directionalLight.castShadow = true;

// Configure shadow properties
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 20; // Increased far distance
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.bottom = -7;
export default directionalLight;
