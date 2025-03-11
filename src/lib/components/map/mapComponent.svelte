<script>
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
  import {
    CSS3DRenderer,
    CSS3DObject,
  } from "three/examples/jsm/renderers/CSS3DRenderer.js";
  import directionalLight from "./directionalLight.js";
  import { signs, icons, updateSignsToFaceCamera } from "./spriteLogic.js";

  /**
   * @type {HTMLDivElement}
   */
  let container;

  onMount(() => {
    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // Enable shadow rendering
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Better quality shadows

    // Add a directional light to create shadows from camera POV

    scene.add(directionalLight);

    // Add some ambient light to prevent areas being too dark
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Slightly increased ambient light
    scene.add(ambientLight);

    // Setup CSS3D renderer
    const cssRenderer = new CSS3DRenderer();
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.position = "absolute";
    cssRenderer.domElement.style.top = "0";
    cssRenderer.domElement.style.pointerEvents = "none"; // Allow click-through
    container.appendChild(renderer.domElement);
    container.appendChild(cssRenderer.domElement);

    renderer.setSize(window.innerWidth, window.innerHeight);

    // Load GLTF Model
    const loader = new GLTFLoader();
    loader.load(
      "map/scene.gltf",
      (gltf) => {
        const model = gltf.scene;

        scene.add(model);

        // Create signs from data and add them to the scene
        signs.forEach((sign) => {
          scene.add(sign);
        });

        // Create icons from data and add them to the scene
        icons.forEach((icon) => {
          scene.add(icon);
        });

        // Set up bobbing animation parameters
        const bobAmount = 0.05; // How far to rotate in each direction (in radians)
        const bobSpeed = 0.006; // Speed of the bobbing motion
        let time = 0;

        // Animation Loop
        function animate() {
          requestAnimationFrame(animate);

          // Calculate bobbing motion using sine wave
          time += bobSpeed;
          scene.rotation.y = Math.sin(time) * bobAmount;

          // Keep light directly above the scene, regardless of scene rotation
          directionalLight.position.set(0, 15, 0);
          directionalLight.target.position.set(0, 0, 0);
          scene.add(directionalLight.target);

          // Update sign rotations to face camera
          updateSignsToFaceCamera(signs, camera);

          // Make icon meshes face the camera instead of using quaternion directly
          /* iconSprites.forEach((mesh) => {
            // Get the world position of the camera
            const tempCameraPosition = new THREE.Vector3();
            tempCameraPosition.setFromMatrixPosition(camera.matrixWorld);
            
            // Make mesh face the camera
            mesh.lookAt(tempCameraPosition);
          }); */

          renderer.render(scene, camera);
          cssRenderer.render(scene, camera);
        }
        animate();
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    camera.position.z = 5;

    // Handle Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      cssRenderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      container.removeChild(renderer.domElement);
      container.removeChild(cssRenderer.domElement);
    };
  });
</script>

<div class="container">
  <h2>Hello World</h2>
  <div bind:this={container} class="three-container"></div>
</div>

<style>
  h1 {
  }
  .container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: black;
  }
  .three-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  :global(.map-sign) {
    background-color: black;
    color: white;
    border: 2px dashed var(--yellow);
    border-radius: 999px;
    padding: 10px 15px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    width: auto;
    user-select: none;
    transform-origin: center;
  }
  :global(.map-sign:hover) {
    background-color: #333;
  }
  :global(.child-element) {
    width: 0px;
    height: 40px;
    border: 1px dashed var(--yellow);
  }
  :global(.map-sign-container) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
