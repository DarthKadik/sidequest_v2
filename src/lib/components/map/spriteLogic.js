import * as THREE from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { gsap } from "gsap";

// Sign data including positions and text content
const signData = [
  {
    position: new THREE.Vector3(0, 0.2, -0.091),
    text: "How Sidequest works",
    url: "/about",
  }
];

// Icon data including positions and icon types
const iconData = [
  {
    position: new THREE.Vector3(-1.808, -0.505, 0.53),
    type: "tree",
  },
  {
    position: new THREE.Vector3(-1.151, -0.43, 0.233),
    type: "track",
  },
  {
    position: new THREE.Vector3(-1.766, -0.263, 0.087),
    type: "stone",
    flipped: true,
  },
  {
    position: new THREE.Vector3(-0.1, 0.5, -0.5),
    type: "rocket",
    flipped: true
  },
  {
    position: new THREE.Vector3(-2.109, -0.285, -0.098),
    type: "face",
  },
  {
    position: new THREE.Vector3(1.01, 0.162, 0.2),
    type: "face",
    flipped: true,
  },
  {
    position: new THREE.Vector3(1.16, 0.13, 0.3),
    type: "face",
  },
  {
    position: new THREE.Vector3(1.31, 0.282, 0),
    type: "face",
  },
  {
    position: new THREE.Vector3(0.88, 0.26, -0.1),
    type: "stone",
  },
  {
    position: new THREE.Vector3(1.884, 0.441, -0.084),
    type: "tree",
  },
  {
    position: new THREE.Vector3(2.206, 0.497, -0.125),
    type: "tree",
  },
  {
    position: new THREE.Vector3(-1.151, -0.3, 0.233),
    type: "runner",
  }
];

const iconMap = {
    face: { source: "map/icons/face.png", height: 194, width: 183 },
  rock: { source: "map/icons/stone.png", height: 273, width: 264 },
  rocket: { source: "map/icons/rocket.png", height: 576, width: 478 },
  track: { source: "map/icons/track.png", height: 579, width: 1129 },
  runner: { source: "map/icons/runner.png", height: 300, width: 450 },
  tree: { source: "map/icons/tree.png", height: 362, width: 282 },
  stone: { source: "map/icons/rock.png", height: 273, width: 264 }, // Alias for rock
};

// Function to create icon sprite
/**
 * @param {{ position: THREE.Vector3; type: string; flipped?: boolean }} data
 * @returns {THREE.Mesh|null}
 */
function createIconSprite(data) {
  // Get icon information from the iconMap based on type
  const iconInfo = iconMap[data.type];

  if (!iconInfo) {
    console.error(`Icon type "${data.type}" not found in iconMap`);
    return null;
  }

  const textureLoader = new THREE.TextureLoader();
  const iconTexture = textureLoader.load(iconInfo.source);

  const material = new THREE.MeshBasicMaterial({
    map: iconTexture,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    color: 0xffc715, // Yellow color
    side: THREE.DoubleSide,
  });

  const height = iconInfo.height / 1250; // Base height
  const width = iconInfo.width / 1250; // Width based on aspect ratio

  // Create a plane geometry with the correct aspect ratio
  const planeGeometry = new THREE.PlaneGeometry(width, height);

  if (data.flipped) {
    // Flip the geometry if needed
    planeGeometry.scale(-1, 1, 1);
  }
  if (data.type === "track") {
    planeGeometry.rotateY(-9 * ((2 * Math.PI) / 360));
    planeGeometry.rotateX(-65 * ((2 * Math.PI) / 360));
    planeGeometry.rotateZ(0 * ((2 * Math.PI) / 360));
  }

  if (data.type === "rocket") {
    planeGeometry.rotateZ(-10 * ((2 * Math.PI) / 360));
  }

  // Adjust the geometry vertices to make bottom center the origin point
  planeGeometry.translate(0, height / 2, 0);

  const iconMesh = new THREE.Mesh(planeGeometry, material);

  // Position at the designated location
  iconMesh.position.copy(data.position);

  // Make mesh render above other objects
  iconMesh.renderOrder = 1;

  return iconMesh;
}

// Function to create CSS3D sign
/**
 * @param {{position: any;text: any;url: any;}} data
 * @returns {CSS3DObject | null}
 * @param {number} index
 */
function createSign(data, index) {
  // Check if document is defined (browser environment)
  if (typeof document === 'undefined') {
    return null;
  }
  
  // Create div element for sign
  const signElement = document.createElement("div");
  signElement.className = "map-sign-container";
  const signTop = document.createElement("div");
  signTop.className = "map-sign standard-text";
  signTop.style.pointerEvents = "auto"; // Enable interaction
  signTop.textContent = data.text;

  const signBottom = document.createElement("div");
  signBottom.className = "child-element";

  signElement.appendChild(signTop);
  signElement.appendChild(signBottom);
  // Add click handler
  signElement.addEventListener("click", () => {
    window.location.href = data.url;
  });

  // Create CSS3DObject with the div
  const sign = new CSS3DObject(signElement);
  sign.position.copy(data.position);
  sign.scale.set(0.01, 0.01, 0.01); // Scale up for narrow screens

  // Set initial position for animation
  sign.position.y += 2;

  // Animate to final position with delay
  gsap.to(sign.position, { y: data.position.y, duration: 1, ease: "bounce.out", delay: 0.5 + index * 0.1 });

  return sign;
}

// Function to update signs to face the camera
/**
 * @param {CSS3DObject[]} signs
 * @param {THREE.Camera} camera
 */
export function updateSignsToFaceCamera(signs, camera) {
  signs.forEach((sign) => {
    // Get the world position of the camera
    const tempCameraPosition = new THREE.Vector3();
    tempCameraPosition.setFromMatrixPosition(camera.matrixWorld);

    // Make sign face the camera
    sign.lookAt(tempCameraPosition);
  });
}

export const signs = typeof document !== 'undefined' 
  ? signData.map((data, index) => createSign(data, index)).filter(sign => sign !== null)
  : [];
export const icons = typeof document !== 'undefined'
  ? iconData
    .map(createIconSprite)
    .filter((icon) => icon !== null)
  : [];
