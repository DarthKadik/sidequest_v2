<script lang="ts">
    import { onMount } from 'svelte';
	import Carousel from '$lib/components/demo/Carousel.svelte';
	import Card from '$lib/components/demo/Card.svelte';
	import Popup from '$lib/components/demo/Popup.svelte';
    import projects from '$lib/utils/projects.json';

    interface Project {
        id: number;
        name: string;
        oneliner: string;
        shortDesc: string;
        video: string;
        longDesc: string;
        projectLink: string;
        learning: string;
        contact: string;
        tags: string[];
        image: string; // Added the missing 'image' property
    }

	let isGridView: boolean = false;
	let selectedProject: Project | null = null;
    let carousels: Carousel[] = [];
    let searchQuery: string = '';
    let selectedTags: string[] = [];
    let isSmallScreen: boolean = false;

	function showPopup(project: Project): void {
		selectedProject = project;
	}

	function closePopup(): void {
		selectedProject = null;
	}

    function pauseCarousels(): void {
        carousels.forEach(carousel => {
            if (carousel) {
                carousel.stopAnimation();
            }
        });
    }

    function resumeCarousels(): void {
        carousels.forEach(carousel => {
            if (carousel){
                carousel.resumeAnimation();
            }
        });
    }

    function toggleTag(tag: string): void {
        if (selectedTags.includes(tag)) {
        selectedTags = selectedTags.filter(t => t !== tag);
        } else {
        selectedTags = [...selectedTags, tag];
        }
    }

    function filterProjects(projects: Project[]): Project[] {
        return projects.filter(project => {
            const matchesSearch = project.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) || project.longDesc.toLowerCase().includes(searchQuery.toLowerCase()) || project.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => project.tags.includes(tag));
            return matchesSearch && matchesTags;
        });
    }

    onMount(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        isSmallScreen = mediaQuery.matches;

        if (isSmallScreen) {
            isGridView = true; // Default to grid view on mobile
        }

        mediaQuery.addEventListener('change', (event) => {
            isSmallScreen = event.matches;
            if (isSmallScreen) {
                isGridView = true;
            }
        });
    });
</script>

<div class="wrapper">
        <div class="header">
            <div class="logo">
              <a
              href="/"
              target="_self"
              aria-label="Home"
            >
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" zoomAndPan="magnify" viewBox="0 0 375 93.749996" height="50" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="096743d212"><path d="M 1 3.230469 L 79 3.230469 L 79 90 L 1 90 Z M 1 3.230469 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#096743d212)"><path fill="#ffc715" d="M 40.191406 90.265625 C 39.4375 90.265625 38.683594 90.078125 38.027344 89.679688 L 4.09375 70.101562 C 2.730469 69.324219 1.90625 67.890625 1.90625 66.335938 C 1.90625 64.785156 2.730469 63.347656 4.070312 62.574219 L 21.0625 52.761719 C 22.402344 51.984375 24.074219 51.984375 25.414062 52.761719 L 40.167969 61.277344 L 48.402344 56.527344 L 21.0625 40.738281 C 19.71875 39.960938 18.894531 38.523438 18.894531 36.972656 C 18.894531 35.417969 19.71875 33.984375 21.0625 33.207031 L 37.980469 23.441406 C 39.320312 22.664062 40.992188 22.664062 42.332031 23.441406 L 57.085938 31.960938 L 65.367188 27.183594 L 40.144531 12.617188 L 8.425781 30.949219 C 6.332031 32.148438 3.671875 31.441406 2.472656 29.347656 C 1.273438 27.277344 1.976562 24.59375 4.070312 23.394531 L 38.003906 3.816406 C 39.34375 3.042969 41.015625 3.042969 42.355469 3.816406 L 76.285156 23.394531 C 77.625 24.171875 78.449219 25.605469 78.449219 27.160156 C 78.449219 28.714844 77.625 30.148438 76.285156 30.925781 L 59.296875 40.738281 C 57.957031 41.511719 56.285156 41.511719 54.945312 40.738281 L 40.191406 32.21875 L 31.953125 36.972656 L 59.296875 52.761719 C 60.636719 53.539062 61.460938 54.972656 61.460938 56.527344 C 61.460938 58.078125 60.636719 59.515625 59.296875 60.289062 L 42.378906 70.054688 C 41.039062 70.832031 39.367188 70.832031 38.027344 70.054688 L 23.273438 61.539062 L 14.988281 66.3125 L 40.214844 80.878906 L 71.957031 62.550781 C 74.027344 61.347656 76.710938 62.054688 77.910156 64.148438 C 79.109375 66.21875 78.402344 68.902344 76.308594 70.101562 L 42.378906 89.679688 C 41.695312 90.078125 40.945312 90.265625 40.214844 90.265625 Z M 40.191406 90.265625 " fill-opacity="1" fill-rule="nonzero"/></g><path fill="#ffc715" d="M 112.285156 59.914062 L 117.367188 58.289062 C 118.828125 61.867188 121.957031 63.820312 124.945312 63.820312 C 127.109375 63.820312 130.40625 62.785156 130.40625 59.539062 C 130.40625 56.714844 127.699219 55.867188 125.039062 55.089844 L 122.003906 54.21875 C 118.757812 53.253906 113.675781 51.253906 113.675781 45.394531 C 113.675781 39.535156 118.710938 36.523438 124.214844 36.523438 C 129.722656 36.523438 133.957031 39.773438 135.25 43.984375 L 130.121094 45.726562 C 129.25 43.300781 127.25 41.066406 123.957031 41.066406 C 121.203125 41.066406 119.203125 42.570312 119.203125 45.019531 C 119.203125 48.054688 122.734375 49.183594 125.367188 49.9375 L 127.910156 50.691406 C 130.992188 51.5625 136.191406 53.066406 136.191406 58.925781 C 136.191406 64.453125 131.699219 68.335938 124.992188 68.335938 C 118.285156 68.335938 113.792969 64.972656 112.285156 59.890625 Z M 112.285156 59.914062 " fill-opacity="1" fill-rule="nonzero"/><path fill="#ffc715" d="M 145.203125 23.605469 C 147.324219 23.605469 148.945312 25.347656 148.945312 27.347656 C 148.945312 29.558594 147.324219 31.253906 145.203125 31.253906 C 142.992188 31.253906 141.371094 29.582031 141.371094 27.347656 C 141.371094 25.347656 142.992188 23.605469 145.203125 23.605469 Z M 142.382812 37.394531 L 147.910156 37.394531 L 147.910156 67.417969 L 142.382812 67.417969 Z M 142.382812 37.394531 " fill-opacity="1" fill-rule="nonzero"/><path fill="#ffc715" d="M 154.40625 52.429688 C 154.40625 42.691406 160.570312 36.523438 168.195312 36.523438 C 172.78125 36.523438 176.429688 38.808594 178.429688 42.476562 L 178.546875 42.476562 L 178.546875 24.125 L 184.078125 24.125 L 184.078125 58.054688 C 184.078125 63.042969 184.453125 65.089844 185.042969 67.417969 L 179.582031 67.417969 C 179.089844 65.46875 178.875 63.960938 178.875 62.429688 L 178.757812 62.429688 C 176.476562 66.429688 172.429688 68.335938 168.21875 68.335938 C 160.050781 68.335938 154.429688 61.679688 154.429688 52.429688 Z M 169.277344 63.136719 C 174.523438 63.136719 178.640625 58.691406 178.640625 52.359375 C 178.640625 46.03125 174.523438 41.65625 169.277344 41.65625 C 164.027344 41.65625 160.121094 46.195312 160.121094 52.429688 C 160.121094 58.667969 163.957031 63.136719 169.277344 63.136719 Z M 169.277344 63.136719 " fill-opacity="1" fill-rule="nonzero"/><path fill="#ffc715" d="M 190.546875 52.550781 C 190.546875 43.230469 196.757812 36.523438 205.417969 36.523438 C 211.960938 36.523438 219.488281 40.476562 219.488281 52.007812 L 219.488281 53.796875 L 196.125 53.796875 C 196.5 59.796875 200.570312 63.417969 205.746094 63.417969 C 210.03125 63.417969 213.160156 60.832031 214.664062 57.089844 L 219.746094 59.089844 C 217.628906 64.667969 212.382812 68.335938 205.722656 68.335938 C 197.019531 68.335938 190.523438 62.007812 190.523438 52.550781 Z M 213.867188 49.726562 C 213.535156 43.511719 209.371094 41.277344 205.371094 41.277344 C 200.5 41.277344 197.207031 44.738281 196.382812 49.726562 Z M 213.867188 49.726562 " fill-opacity="1" fill-rule="nonzero"/><path fill="#ffc715" d="M 248.242188 62.171875 C 245.75 66.289062 241.960938 68.335938 237.628906 68.335938 C 229.675781 68.335938 224.101562 61.464844 224.101562 52.3125 C 224.101562 43.160156 230.21875 36.523438 237.84375 36.523438 C 242.453125 36.523438 246.171875 38.855469 248.242188 42.59375 L 248.359375 42.59375 L 248.359375 37.394531 L 253.726562 37.394531 L 253.726562 79.324219 L 248.265625 79.324219 L 248.265625 62.171875 Z M 238.996094 63.136719 C 244.242188 63.136719 248.359375 58.691406 248.359375 52.359375 C 248.359375 46.03125 244.195312 41.65625 238.996094 41.65625 C 233.796875 41.65625 229.84375 46.195312 229.84375 52.429688 C 229.84375 58.667969 233.675781 63.136719 238.996094 63.136719 Z M 238.996094 63.136719 " fill-opacity="1" fill-rule="nonzero"/><path fill="#ffc715" d="M 261.9375 56.21875 L 261.9375 37.394531 L 267.464844 37.394531 L 267.464844 54.265625 C 267.464844 60.476562 270.503906 63.183594 274.289062 63.183594 C 279.324219 63.183594 282.125 58.597656 282.125 53.9375 L 282.125 37.371094 L 287.65625 37.371094 L 287.65625 58.03125 C 287.65625 63.019531 288.03125 65.066406 288.621094 67.394531 L 283.089844 67.394531 C 282.597656 65.441406 282.382812 63.984375 282.433594 62.738281 L 282.3125 62.738281 C 280.359375 66.40625 277.113281 68.3125 272.738281 68.3125 C 266.785156 68.3125 261.914062 64.808594 261.914062 56.195312 Z M 261.9375 56.21875 " fill-opacity="1" fill-rule="nonzero"/><path fill="#ffc715" d="M 294.125 52.550781 C 294.125 43.230469 300.339844 36.523438 308.996094 36.523438 C 315.539062 36.523438 323.066406 40.476562 323.066406 52.007812 L 323.066406 53.796875 L 299.703125 53.796875 C 300.078125 59.796875 304.148438 63.417969 309.328125 63.417969 C 313.609375 63.417969 316.738281 60.832031 318.246094 57.089844 L 323.328125 59.089844 C 321.210938 64.667969 315.960938 68.335938 309.304688 68.335938 C 300.597656 68.335938 294.101562 62.007812 294.101562 52.550781 Z M 317.445312 49.726562 C 317.113281 43.511719 312.949219 41.277344 308.949219 41.277344 C 304.078125 41.277344 300.785156 44.738281 299.960938 49.726562 Z M 317.445312 49.726562 " fill-opacity="1" fill-rule="nonzero"/><path fill="#ffc715" d="M 326.972656 59.914062 L 332.054688 58.289062 C 333.515625 61.867188 336.644531 63.820312 339.632812 63.820312 C 341.796875 63.820312 345.09375 62.785156 345.09375 59.539062 C 345.09375 56.714844 342.386719 55.867188 339.726562 55.089844 L 336.691406 54.21875 C 333.445312 53.253906 328.363281 51.253906 328.363281 45.394531 C 328.363281 39.535156 333.398438 36.523438 338.902344 36.523438 C 344.410156 36.523438 348.644531 39.773438 349.9375 43.984375 L 344.808594 45.726562 C 343.9375 43.300781 341.9375 41.066406 338.644531 41.066406 C 335.890625 41.066406 333.890625 42.570312 333.890625 45.019531 C 333.890625 48.054688 337.421875 49.183594 340.058594 49.9375 L 342.597656 50.691406 C 345.679688 51.5625 350.878906 53.066406 350.878906 58.925781 C 350.878906 64.453125 346.386719 68.335938 339.679688 68.335938 C 332.972656 68.335938 328.480469 64.972656 326.972656 59.890625 Z M 326.972656 59.914062 " fill-opacity="1" fill-rule="nonzero"/><path fill="#ffc715" d="M 358.902344 58.171875 L 358.902344 42.382812 L 352.949219 42.382812 L 352.949219 37.394531 L 358.902344 37.394531 L 358.902344 28.691406 L 364.363281 28.691406 L 364.363281 37.394531 L 373.070312 37.394531 L 373.070312 42.382812 L 364.363281 42.382812 L 364.363281 56.335938 C 364.363281 59.464844 364.363281 63.371094 368.574219 63.371094 C 369.917969 63.371094 371.492188 62.949219 373.070312 62.007812 L 373.070312 67.042969 C 371.5625 67.914062 369.492188 68.335938 367.492188 68.335938 C 358.878906 68.335938 358.878906 61.464844 358.878906 58.171875 Z M 358.902344 58.171875 " fill-opacity="1" fill-rule="nonzero"/></svg>
            </a>
            </div>
        <div class="title">
            <p>S1 Project Library</p>
            <p  class="hidden-on-desktop" style="color: white; text-align: left; font-size: 0.7em; width: 75vw;">We are working on making this page available for smaller screen sizes, but in the meantime, please use a bigger screen!</p>
            <button id="showAllBtn" on:click={() => {
                isGridView = !isGridView;
                if (isGridView) {
                    pauseCarousels();
                } else {
                    resumeCarousels();
                }
            }}>
                {isGridView ? 'Show Carousels' : 'Show All'}
            </button>
        </div>
        <a href="https://mysidequest.xyz" class="back-link">&lt; Back to home</a>
	</div>

    {#if !isGridView}
            <div class="carousel-container">
                {#if isSmallScreen}
                    <Carousel bind:this={carousels[0]} projects={projects as Project[]} direction={"down"} showPopup={showPopup} />
                {:else}
                    <Carousel bind:this={carousels[0]} projects={projects as Project[]} direction={"down"} showPopup={showPopup} />
                    <Carousel bind:this={carousels[1]} projects={projects as Project[]} direction={"up"} showPopup={showPopup} />
                    <Carousel bind:this={carousels[2]} projects={projects as Project[]} direction={"down"} showPopup={showPopup} />
                {/if}
            </div>
    {:else}
        <div class="grid-search-container">
            <div class="search-filter">
                <input type="text" placeholder="Search..." bind:value={searchQuery} />
                <div class="tags">
                    {#each Array.from(new Set(projects.flatMap(project => project.tags))) as tag}
                        <button type="button" class:selected={selectedTags.includes(tag)} on:click={() => toggleTag(tag)}>{tag}</button>
                    {/each}
                </div>
            </div>
        <div class="grid-container">
                {#each filterProjects(projects) as project, index (project.id)}
                    <Card 
                        {project} 
                        isGridView={true} 
                        showPopup={showPopup} 
                        style={!isSmallScreen && index < 3 ? 'margin-top: 50px;' : !isSmallScreen && index > filterProjects(projects).length - 4 ? 'margin-bottom: 50px;' : ''} 
                    />
                {/each}
            <div class="before"></div>
            <div class="after"></div>
        </div>
      </div>
	{/if}

	{#if selectedProject}
    	<Popup project={selectedProject} {closePopup} />
        <div class="overlay" role="button" tabindex="0" on:click|stopPropagation={closePopup} on:keydown|stopPropagation={(e) => e.key === 'Enter' && closePopup()}></div>
	{/if}
</div>

<style>

    .hidden-on-desktop {
        display: none;
    }   

	 :global(body) {
        background-color: black;
        font-family: 'Poppins', sans-serif;
        margin: 0;
        overflow-x: hidden;
    }

    .wrapper {
        display: flex;
        min-height: 100vh;
        width: 100vw;
        box-sizing: border-box;
    }

    .header {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 15px 20px 20px 20px;
        width: 22vw;
        flex-shrink: 0;
        z-index: 101;
        align-items: center;
    }

    .header h1 {
        color: #ffc715;
        font-size: 2rem;
        margin-bottom: 10px;
    }

    .header .back-link {
        text-decoration: none;
        color: #bbbbbb;
        font-size: 1rem;
    }

    .header p {
        color: #ffc715;
        font-size: 1.5rem;
    }

    .title {
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
        align-items: center;
    }

    .title p {
        text-align: center;
    }

    .title button {
        display: block;
        width: fit-content;
        margin: 0 auto;
    }

    #showAllBtn {
        background-color: #ffc715;
        color: black;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        margin-bottom: 1rem;
        font-family: 'Poppins', sans-serif;
    }

    #showAllBtn:hover {
        background-color: #e6b400;
    }

    .grid-search-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 20px 20px 0 20px;
        position: relative;
        width: 100%;
        height: calc(100vh);
    }

    .search-filter {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 20px 20px 0 20px;
        height: calc(30vh - 20px);
    }

    .search-filter input {
        padding: 10px;
        font-size: 1rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        width: 75%;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        width: 75%;
    }

    .tags button {
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #333;
        color: white;
        cursor: pointer;
    }

    .tags button.selected {
        background-color: #ffc715;
        color: black;
    }

    :global(.carousel-container) {
        display: flex;
        align-items: right;
        justify-content: right;
    }

    .grid-container {
        position: relative;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(20vw, 1fr));
        gap: 10px;
        padding: 0 5px;
        width: 100%;
		height: 70vh;
        overflow-y: scroll;
        margin-left: auto;

    }

	:global(.overlay) {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 999;
	}

    .before,
    .after {
        content: '';
        position: fixed;
        left: 0;
        right: 0;
        height: 100px;
        z-index: 100;
        pointer-events: none;
    }

    .before {
        top: 30vh;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    }

    .after {
        bottom: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    }

    @media (max-width: 768px) {
        .search-filter {
            display: none;
        }
        .wrapper {
            flex-direction: column;
        }

        .grid-container {
            justify-items: center;
        }

        .header {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px 0;
            height: 20vh;
        }

        .header p {
            font-size: 1.5rem;
            text-align: center;
            margin: 5px 0;
        }

        #showAllBtn {
            display: none;
        }

        .grid-search-container {
            height: calc(80vh - 10px);
        }

        .grid-container {
            grid-template-columns: repeat(auto-fill, minmax(50vw, 1fr));
            height: auto;
        }

        img {
            max-width: 100vw;
        }

        .before {
            top: calc(20vh + 10px); /* Adjusted to align exactly on top of the cards */
        }
    }

    @media (max-width: 7px) {

        .header {
            width: 35vw;
            padding: 4px 15px 4px 4px;
        }

        .header p {
            font-size: 1rem;
        }

        #showAllBtn {
            font-size: 0.8rem;
        }

        .header .back-link {
            font-size: 0.8rem;
        }

        .header h1 {
            font-size: 1.3rem;
        }
        .grid-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .tags {
            display: none;
        }

        .wrapper {
            flex-direction: row;
        }

        .header {
            width: 30vw;
            padding: 20px 10px 20px 10px;
        }

        .search-filter {
            height: auto;
        }

        .grid-search-container {
            height: auto;
        }

        .centralizer {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;
            padding: 0 20px;
        }

        .before {
            display: none;
        }

        .header {
            width: 100vw;
        }

        #showAllBtn {
            display: none;
        }

        .hidden-on-desktop {
            display: block;
        }
    }
</style>