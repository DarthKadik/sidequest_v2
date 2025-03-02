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
    let searchQuery: string = '';
    let selectedTags: string[] = [];

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
            const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || project.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => project.tags.includes(tag));
            return matchesSearch && matchesTags;
        });
    }
</script>

<div class="wrapper">
	<div class="header">
        <h1>sidequest</h1>
        <div class="title">
            <p>S1 Project Library</p>
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
            <Carousel bind:this={carousels[0]} projects={projects as Project[]} direction={"down"} showPopup={showPopup} />
			<Carousel bind:this={carousels[1]} projects={projects as Project[]} direction={"up"} showPopup={showPopup} />
			<Carousel bind:this={carousels[2]} projects={projects as Project[]} direction={"down"} showPopup={showPopup} />
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
                <Card {project} isGridView={true} showPopup={showPopup} style={index < 3 ? 'margin-top: 50px;' : index > filterProjects(projects).length - 4 ? 'margin-bottom: 50px;' : ''} />
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
        color: #ffc715;
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
</style>