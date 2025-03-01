<script lang="ts">
    interface Project {
        name: string;
        title: string;
        description: string;
        image: string;
        tags: string[];
    }

    export let project: Project | null;
    export let closePopup: () => void;

	$: if(project){
		console.log(project.title)
	}
</script>

{#if project}
    <div class="popup show">
        <div class="popup-content">
            <button class="popup-close" on:click={closePopup}>&times;</button>
            <img src={project.image} alt={project.title} />
            <h2 class="popup-title">{project.title}</h2>
            <p class="popup-description">{project.description}</p>
            <div class="popup-badges">
                {#each project.tags as tag}
                    <span class="badge">{tag}</span>
                {/each}
            </div>
        </div>
    </div>
{/if}

<style>
	 .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: black;
        border: 2px solid #ffc715;
        border-radius: 15px;
        padding: 20px;
        z-index: 1000;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
		display: block;
        max-width: 80%;
        max-height: 80vh;
        overflow-y: auto;
    }

    .popup.show {
        display: block;
    }
    .popup-content {
        color: #fff;
        text-align: left;
    }

    .popup-content img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        margin-bottom: 15px;
    }

    .popup-close {
        position: absolute;
        top: 5px;
        right: 10px;
        font-size: 1.5rem;
        color: #ffc715;
        cursor: pointer;
        background: none;
        border: none;
        padding: 0;
    }

    .popup-title {
        font-size: 1.5rem;
        color: #ffc715;
        margin-bottom: 10px;
    }

    .popup-description {
        font-size: 1rem;
        color: #bbbbbb;
        margin-bottom: 15px;
    }

    .popup-badges {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
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

</style>    