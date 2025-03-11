<script>
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
  import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";

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
    
    // Setup CSS3D renderer
    const cssRenderer = new CSS3DRenderer();
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = '0';
    cssRenderer.domElement.style.pointerEvents = 'none'; // Allow click-through
    container.appendChild(renderer.domElement);
    container.appendChild(cssRenderer.domElement);

    // Sign data including positions and text content
    const signData = [
      { 
        position: new THREE.Vector3(-1.3, 0.111, 0.5), 
        text: "Sign 1", 
        url: "https://example.com/1" 
      },
      { 
        position: new THREE.Vector3(-1, 0, -1), 
        text: "Sign 2", 
        url: "https://example.com/2" 
      },
    ];

    renderer.setSize(window.innerWidth, window.innerHeight);

    /**
     * @type {CSS3DObject[]}
     */
    const signs = [];

    // Function to create CSS3D sign
    /**
     * @param {{ position: any; text: any; url: any; }} data
     */
    function createSign(data) {
      // Create div element for sign
      const signElement = document.createElement('div');
      signElement.className = 'map-sign standard-text';
      signElement.textContent = data.text;
      signElement.style.pointerEvents = 'auto'; // Enable interaction
      
      // Add click handler
      signElement.addEventListener('click', () => {
        window.open(data.url, '_blank');
      });
      
      // Create CSS3DObject with the div
      const sign = new CSS3DObject(signElement);
      sign.position.copy(data.position);
      sign.scale.set(0.01, 0.01, 0.01); // Scale down (CSS units to Three.js units)
      
      scene.add(sign);
      signs.push(sign);
      
      return sign;
    }

    // Load GLTF Model
    const loader = new GLTFLoader();
    loader.load(
      "map/scene.gltf",
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        // Create signs from data
        signData.forEach(data => createSign(data));

        // Set up bobbing animation parameters
        const bobAmount = 0.1; // How far to rotate in each direction (in radians)
        const bobSpeed = 0.01; // Speed of the bobbing motion
        let time = 0;

        // Animation Loop
        function animate() {
          requestAnimationFrame(animate);

          // Calculate bobbing motion using sine wave
          time += bobSpeed;
          scene.rotation.y = Math.sin(time) * bobAmount;

          // Update sign rotations to face camera
          signs.forEach(sign => {
            // Get the world position of the camera
            const tempCameraPosition = new THREE.Vector3();
            tempCameraPosition.setFromMatrixPosition(camera.matrixWorld);
            
            // Make sign face the camera
            sign.lookAt(tempCameraPosition);
          });

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
  <h1>Hello World</h1>
  <div bind:this={container} class="three-container"></div>
</div>

<style>
  .container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: white;
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
</style>
