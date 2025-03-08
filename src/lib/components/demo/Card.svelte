<script lang="ts">
    interface Project {
        name: string;
        oneliner: string;
        shortDesc: string;
        image: string;
        video: string;
        longDesc: string;
        projectLink: string;
        learning: string;
        contact: string;
        tags: string[];
    }

    export let project: Project;
    export let isGridView: boolean = false;
    export let showPopup: (project: Project) => void;
    export let className: string = '';
    export let style: string = '';
</script>

<button type="button" style="{style}" class="card {className}" class:grid-card={isGridView} on:click={() => showPopup(project)}>
    {#if !isGridView}
        <div class="image-container">
            {#if project.name.trim() != "Vladimir Surtaev"}
                <img style="max-width: 20vw" src={`/projectImages/${project.name.split(' ')[0]}sProject.png`} alt={project.oneliner} />
            {:else}
                <img style="max-width: 20vw" src={`/projectImages/${project.name.split(' ')[0]}sProject2.png`} alt={project.oneliner} />
            {/if}    
            <div class="fog-overlay"></div>
        </div>
    {/if}
    <div class="content">
        <p class="name">{project.name} presents</p>
        <h2>{project.oneliner}</h2>
        <p class="desc">{project.shortDesc}</p>
        <div class="badges">
            {#each project.tags as tag}
                <span class="badge">{tag}</span>
            {/each}
        </div>
    </div>
</button>

<style>
    .card {
        width: 22.5vw;
        display: flex;
        flex-direction: column;
        padding: 15px;
        background-color: #000000;
        border-radius: 15px;
        border: 2px dashed #ffc715;
        text-align: left;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
        margin: 0 auto;
        transition: transform 0.3s ease;
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        outline: none;
        z-index: 100;
        }

        .card:hover {
        transform: scale(1.02);
        background: #0d0d0d;
        }

    .card:focus {
       outline: 2px solid #ffc715;
    }
	.grid-card {
        width: 23vw;
        border: 1px solid #ffc715;
        box-shadow: none;
        margin: 0;
    }

    .grid-card .image-container {
        display: none;
    }
.image-container {
        position: relative;
        display: block;
        width: 100%;
    }

    .image-container img {
        display: block;
        width: 100%;
        height: auto;
    }

    .fog-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50%;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
        pointer-events: none;
    }

    .content {
        margin: 0 10px;
    }
	 .badges {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 10px;
    }

    .badge {
        font-size: 0.8rem;
        padding: 1px 10px;
        border-radius: 15px;
        color: #ffffff;
        background: none;
        border: 1px solid #ffc715;
        white-space: nowrap;
    }

    .name {
        color: #ffffff;
        margin: 10px 0 5px 0;
    }
	 .card img {
        width: 100%;
        max-height: 25vh;
        height: auto;
        border-radius: 10px;
    }

    .card h2 {
        font-size: 1.2rem;
        margin: 0 0 5px 0;
        color: #ffc715;
    }

    .card .desc {
        font-size: 1rem;
        margin: 0;
        color: #bbbbbb;
    }

    .card span {
        font-size: 0.8rem;
        color: #bbbbbb;
        margin-top: 5px;
    }

    @media (max-width: 768px) {
        .card {
            width: 60vw;
        }
    }
</style>