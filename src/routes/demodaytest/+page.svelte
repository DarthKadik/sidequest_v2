<script lang="ts">
	import Carousel from '$lib/components/demo/Carousel.svelte';
	import Card from '$lib/components/demo/Card.svelte';
	import Popup from '$lib/components/demo/Popup.svelte';
	import projects from '$lib/utils/projects.json';
    
    interface Project {
        name: string;
        title: string;
        description: string;
        image: string;
        tags: string[];
    }

	let isGridView: boolean = false;
	let selectedProject: Project | null = null;
    let carousels: Carousel[] = [];

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


</script>

<div class="wrapper">
	<div class="header">
		<h1>sidequest</h1>
		<p>Projects built with us:</p>
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
		<a href="https://mysidequest.xyz" class="back-link">&lt; Back to home</a>
	</div>

	{#if !isGridView}
		<div class="carousel-container">
            <Carousel bind:this={carousels[0]} projects={projects as Project[]} direction={"down"} showPopup={showPopup} />
			<Carousel bind:this={carousels[1]} projects={projects as Project[]} direction={"up"} showPopup={showPopup} />
			<Carousel bind:this={carousels[2]} projects={projects as Project[]} direction={"down"} showPopup={showPopup} />
		</div>
	{:else}
        <div class="grid-container">
            {#each projects as project (project.id)}
                <Card {project} isGridView={true}  showPopup={showPopup}  />
            {/each}
        </div>
	{/if}

	{#if selectedProject}
    	<Popup project={selectedProject} {closePopup} />
        <div class="overlay" role="button" tabindex="0" on:click|stopPropagation={closePopup} on:keydown|stopPropagation={(e) => e.key === 'Enter' && closePopup()}></div>
	{/if}
</div>

<style>
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
        padding: 20px;
        width: 22vw;
        flex-shrink: 0;
    }

    .header h1 {
        color: #ffc715;
        font-size: 2rem;
        margin-bottom: 10px;
    }

    .header .back-link {
        text-decoration: none;
        color: #ffc715;
        font-size: 1rem;
    }

    .header p {
        color: #ffc715;
        font-size: 1.5rem;
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

    :global(.carousel-container) {
        display: flex;
    }

    :global(.grid-container) {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(20vw, 1fr));
        gap: 10px;
        padding: 20px 5px;
        width: 78vw;
		height: 100vh;
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

</style>