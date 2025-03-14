<script lang="ts">
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
  import {
    CSS3DRenderer,
    CSS3DObject,
  } from "three/examples/jsm/renderers/CSS3DRenderer.js";
  import directionalLight from "./directionalLight.js";
  import { signs, icons, updateSignsToFaceCamera } from "./spriteLogic.js";
  import { gsap } from "gsap";

  /**
   * @type {HTMLDivElement}
   */
  let container: HTMLDivElement;

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
    cssRenderer.domElement.style.position = "absolute";
    cssRenderer.domElement.style.top = "0";
    cssRenderer.domElement.style.pointerEvents = "none"; // Allow click-through
    container.appendChild(renderer.domElement);
    container.appendChild(cssRenderer.domElement);

    // Store model reference and orientation state
    /** @type {THREE.Object3D} */
    let loadedModel: THREE.Object3D;
    let currentOrientation = window.innerWidth >= window.innerHeight ? 'landscape' : 'portrait';

    // Define mapSigns
    /** @type {Array<{ x: string, y: string }>} */
    const mapSigns: Array<{ x: string, y: string }> = [];

    const setRendererSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      
      // Determine orientation
      const newOrientation = width >= height ? 'landscape' : 'portrait';
      const aspectRatio = width / height;
      const orientationChanged = newOrientation !== currentOrientation;
      
      // Apply different settings based on orientation
      if (newOrientation === 'portrait') {
        // Portrait mode settings
        const narrownessAdjustment = Math.max(0, 1 - aspectRatio) * 4;
        
        // More extreme portrait (taller/narrower) needs more adjustments
        const extremePortraitFactor = aspectRatio < 0.6 ? 1.2 : 1;
        
        camera.fov = 45 * extremePortraitFactor;
        camera.position.z = 9 + (narrownessAdjustment * extremePortraitFactor);
        
        // Only adjust scale if orientation changed and model exists
        if (loadedModel && orientationChanged) {
          // Scale adjustment if needed for extreme portrait
          const scaleValue = Math.min(1.0, aspectRatio + 0.2);
          gsap.to(loadedModel.scale, {
            x: scaleValue,
            y: scaleValue,
            z: scaleValue,
            duration: 1,
            ease: "power2.inOut"
          });
        }
      } else {
        // Landscape mode settings
        const widescreenAdjustment = aspectRatio > 2 ? (aspectRatio - 2) * 2 : 0;
        const almostSquareFactor = aspectRatio < 1.5 ? 1.2 : 1;
        
        camera.fov = 45 * almostSquareFactor;
        camera.position.z = 5 + widescreenAdjustment;
        
        // Only reset scale if orientation changed and model exists
        if (loadedModel && orientationChanged) {
          // Reset scale
          gsap.to(loadedModel.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 1,
            ease: "power2.inOut"
          });
        }
      }
      
      // Update current orientation
      currentOrientation = newOrientation;
      
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      cssRenderer.setSize(width, height);

      // Adjust sign positions to avoid squeezing on mobile
      const signContainers = document.querySelectorAll('.map-sign-container');
      signContainers.forEach((container, index) => {
        const sign = mapSigns[index];
        const adjustedX = newOrientation === 'portrait' ? parseFloat(sign.x) * 0.8 + '%' : sign.x;
        const adjustedY = newOrientation === 'portrait' ? parseFloat(sign.y) * 0.8 + '%' : sign.y;
        (container as HTMLElement).style.left = adjustedX;
        (container as HTMLElement).style.top = adjustedY;
      });
    };

    setRendererSize();

    // Load GLTF Model
    const loader = new GLTFLoader();
    loader.load(
      "map/scene.gltf",
      (gltf) => {
        const model = gltf.scene;
        loadedModel = model; // Store reference to model
        
        scene.add(model);
        
        // Apply initial scale for extreme portrait if needed
        if (window.innerWidth < window.innerHeight) {
          const aspectRatio = window.innerWidth / window.innerHeight;
          if (aspectRatio < 0.6) {
            const scaleValue = Math.min(1.0, aspectRatio + 0.2);
            model.scale.set(scaleValue, scaleValue, scaleValue);
          }
        }

        // Create signs from data and add them to the scene
        signs.forEach((sign) => {
          scene.add(sign);
        });

        // Create icons from data and add them to the scene
        icons.forEach((icon) => {
          scene.add(icon);
        });

        // Set up bobbing animation parameters
        const bobAmount = 0.04; // How far to rotate in each direction (in radians)
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

    // Handle Resize with debounce for performance
    let resizeTimeout: number;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setRendererSize();
      }, 100);
    };
    window.addEventListener("resize", onResize);

    // Listen for device orientation changes for mobile
    window.addEventListener("orientationchange", () => {
      setTimeout(setRendererSize, 100);
    });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", setRendererSize);
      container.removeChild(renderer.domElement);
      container.removeChild(cssRenderer.domElement);
    };
  });
</script>

<div class="container">
  <div class="header">
    <div class="logo">
      <a
      href="/"
      target="_self"
      aria-label="Home"
    >
      <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383.91 102.93" width="220px" height="80px">
        <defs>
          <style>
            .cls-1 {
              fill: #FFC715;
            }
          </style>
        </defs>
        <path class="cls-1" d="M53.2,93.72c-.7,0-1.4-.18-2.03-.54l-31.69-18.3c-1.26-.73-2.03-2.07-2.03-3.52s.78-2.8,2.03-3.52l15.88-9.17c1.26-.73,2.81-.73,4.07,0l13.78,7.96,7.68-4.44-25.54-14.74c-1.26-.73-2.03-2.07-2.03-3.52s.78-2.8,2.03-3.52l15.82-9.13c1.26-.73,2.81-.73,4.07,0l13.78,7.96,7.74-4.47-23.56-13.6-29.66,17.12c-1.95,1.12-4.43.46-5.55-1.49-1.12-1.95-.46-4.43,1.49-5.55l31.69-18.3c1.26-.73,2.81-.73,4.07,0l31.69,18.3c1.26.73,2.03,2.07,2.03,3.52s-.78,2.8-2.03,3.52l-15.88,9.17c-1.26.73-2.81.73-4.07,0l-13.78-7.96-7.68,4.44,25.54,14.74c1.26.73,2.03,2.07,2.03,3.52s-.78,2.8-2.03,3.52l-15.82,9.13c-1.26.73-2.81.73-4.07,0l-13.78-7.96-7.74,4.47,23.56,13.6,29.66-17.12c1.94-1.12,4.43-.46,5.55,1.49,1.12,1.95.46,4.43-1.49,5.55l-31.69,18.3c-.63.36-1.33.54-2.03.54Z"/>
        <g>
          <path class="cls-1" d="M120.57,65.34l4.75-1.52c1.36,3.34,4.3,5.16,7.08,5.16,2.02,0,5.11-.96,5.11-3.99,0-2.63-2.53-3.44-5.01-4.15l-2.83-.81c-3.03-.91-7.78-2.78-7.78-8.24s4.7-8.29,9.86-8.29,9.1,3.03,10.31,6.98l-4.8,1.62c-.81-2.27-2.68-4.35-5.76-4.35-2.58,0-4.45,1.42-4.45,3.69,0,2.83,3.29,3.89,5.76,4.6l2.37.71c2.88.81,7.74,2.22,7.74,7.68,0,5.16-4.19,8.8-10.46,8.8s-10.46-3.13-11.88-7.89Z"/>
          <path class="cls-1" d="M151.32,31.42c1.97,0,3.49,1.62,3.49,3.49,0,2.07-1.52,3.64-3.49,3.64-2.07,0-3.59-1.57-3.59-3.64,0-1.87,1.52-3.49,3.59-3.49ZM148.69,44.31h5.16v28.06h-5.16v-28.06Z"/>
          <path class="cls-1" d="M159.91,58.36c0-9.1,5.76-14.86,12.89-14.86,4.3,0,7.68,2.12,9.55,5.56h.1v-17.14h5.16v31.7c0,4.65.35,6.57.91,8.75h-5.11c-.46-1.82-.66-3.24-.66-4.65h-.1c-2.12,3.74-5.91,5.51-9.86,5.51-7.63,0-12.89-6.22-12.89-14.86ZM173.81,68.37c4.9,0,8.74-4.15,8.74-10.06s-3.84-10.01-8.74-10.01-8.54,4.25-8.54,10.06,3.59,10.01,8.54,10.01Z"/>
          <path class="cls-1" d="M193.69,58.46c0-8.69,5.81-14.96,13.9-14.96,6.12,0,13.14,3.69,13.14,14.46v1.67h-21.84c.35,5.61,4.15,9,9,9,3.99,0,6.92-2.43,8.34-5.91l4.75,1.87c-1.97,5.21-6.87,8.64-13.09,8.64-8.14,0-14.21-5.91-14.21-14.76ZM215.48,55.83c-.3-5.81-4.2-7.89-7.94-7.89-4.55,0-7.63,3.24-8.39,7.89h16.33Z"/>
          <path class="cls-1" d="M247.58,67.46c-2.33,3.84-5.86,5.76-9.91,5.76-7.43,0-12.64-6.42-12.64-14.96s5.71-14.76,12.84-14.76c4.3,0,7.79,2.17,9.71,5.66h.1v-4.85h5.01v39.18h-5.11v-16.02ZM238.94,68.37c4.9,0,8.74-4.15,8.74-10.06s-3.89-10.01-8.74-10.01-8.54,4.25-8.54,10.06,3.59,10.01,8.54,10.01Z"/>
          <path class="cls-1" d="M260.38,61.9v-17.59h5.16v15.77c0,5.81,2.83,8.34,6.37,8.34,4.7,0,7.33-4.3,7.33-8.64v-15.47h5.16v19.31c0,4.65.35,6.57.91,8.75h-5.16c-.46-1.82-.66-3.19-.61-4.35h-.1c-1.82,3.44-4.85,5.21-8.95,5.21-5.56,0-10.11-3.28-10.11-11.32Z"/>
          <path class="cls-1" d="M290.46,58.46c0-8.69,5.81-14.96,13.9-14.96,6.12,0,13.14,3.69,13.14,14.46v1.67h-21.84c.35,5.61,4.15,9,9,9,3.99,0,6.92-2.43,8.34-5.91l4.75,1.87c-1.97,5.21-6.87,8.64-13.09,8.64-8.14,0-14.21-5.91-14.21-14.76ZM312.25,55.83c-.3-5.81-4.2-7.89-7.94-7.89-4.55,0-7.63,3.24-8.39,7.89h16.33Z"/>
          <path class="cls-1" d="M321.15,65.34l4.75-1.52c1.36,3.34,4.3,5.16,7.08,5.16,2.02,0,5.11-.96,5.11-3.99,0-2.63-2.53-3.44-5.01-4.15l-2.83-.81c-3.03-.91-7.78-2.78-7.78-8.24s4.7-8.29,9.86-8.29,9.1,3.03,10.31,6.98l-4.8,1.62c-.81-2.27-2.68-4.35-5.76-4.35-2.58,0-4.45,1.42-4.45,3.69,0,2.83,3.29,3.89,5.76,4.6l2.37.71c2.88.81,7.74,2.22,7.74,7.68,0,5.16-4.19,8.8-10.46,8.8s-10.46-3.13-11.88-7.89Z"/>
          <path class="cls-1" d="M350.99,63.72v-14.76h-5.56v-4.65h5.56v-8.14h5.11v8.14h8.14v4.65h-8.14v13.04c0,2.93,0,6.57,3.94,6.57,1.26,0,2.73-.41,4.19-1.26v4.7c-1.41.81-3.34,1.21-5.21,1.21-8.04,0-8.04-6.42-8.04-9.5Z"/>
        </g>
      </svg>
    </a>
    </div>
    <div class="header-text">
      <p class="standard-text">Organized online by fellow tinkerers / hackers / artists<br /> from Finland free of charge & open for all.</p>
    </div>
  </div>
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
    transition: font-size 0.3s ease, background-color 0.3s ease;
  }
  :global(.map-sign-small) {
    font-size: 1em;
    padding: 10px 15px;
    border-width: 2px;
  }
  :global(.map-sign-medium) {
    font-size: 1.2em;
    padding: 12px 18px;
  }
  :global(.map-sign-large) {
    font-size: 1.5em;
    padding: 15px 20px;
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

  .header  {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
    background-color: black;
    color: white;
    margin: 0 calc(5vw + 7px) 0 5vw;
    padding: 20px 0 0 0;
  }

  .logo, .header-text {
    width: 50vw;
  }

  .header-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: right;
  }

  p {
    text-align: right;
    font-size: 0.875em;
    color: var(--yellow);
  }

  @media only screen and (max-width: 768px) {
    .header-text {
      display: none;
    }

    .header {
      justify-content: center;
    }
  }
</style>
