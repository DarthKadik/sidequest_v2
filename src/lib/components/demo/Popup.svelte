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

    export let project: Project | null;
    export let closePopup: () => void;

    let videoSrc: string = '';

    $: if (project) {
        videoSrc = `${project.video}?autoplay=1&controls=0&mute=0&modestbranding=1&showinfo=0&rel=0&loop=1&playlist=yWYhCQ2myh8&playsinline=1`;
        console.log(project.shortDesc);
    }
</script>

{#if project}
    <button type="button" class="popup-backdrop" on:click={closePopup} on:keydown={(e) => e.key === 'Enter' && closePopup()} aria-label="Close popup"></button>
    <div class="popup show">
        <div class="popup-content">
            <button class="popup-close" on:click={closePopup}>&times;</button>
            <div style="display: flex; justify-content: center;">
                <iframe
                    style=""
                    width="783" 
                    height="440" 
                    src="{project.video}?autoplay=1&controls=1&mute=0&modestbranding=1&showinfo=0&rel=0&loop=1&playsinline=1" 
                    title="Video of the project" 
                    frameborder="0" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen>
                </iframe>

            </div>
            <div>
                <h2 class="popup-title">{project.oneliner}</h2>
                {#if project.longDesc !== ''}
                    <p class="popup-description">{project.longDesc}</p>
                {:else}
                    <p class="popup-description">{project.shortDesc}</p>
                {/if}
                <hr>
                <p class="popup-detail-title">Created by</p>
                <p class="popup-detail">{project.name}</p>
                {#if project.projectLink !== ''}
                    <p class="popup-detail-title">Link to project</p>
                    <p class="popup-detail"><a href={
                        project.projectLink
                    } target="_blank">{project.projectLink}</a></p>
                {/if}
                {#if project.learning !== ''}
                    <p class="popup-detail-title">Biggest learning in Sidequest</p>
                    <p class="popup-detail">{project.learning}</p>
                {/if}
                {#if project.contact !== ''}
                    <p class="popup-detail-title">Contact</p>
                    <p class="popup-detail">{project.contact}</p>
                {/if}
            </div>
        </div>
    </div>
{/if}

<style>
    iframe {
        border-radius: 15px;
        max-height: 50vh;
    }
    .popup-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 999;
    }

    .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #000000;
        border: 2px solid #ffc715;
        border-radius: 15px;
        padding: 30px;
        z-index: 1000;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        max-width: 50vw;
        max-height: 90vh;
        overflow-y: auto;
        scrollbar-width: 0;
        -ms-overflow-style: none;
    }

    .popup::-webkit-scrollbar {
        width: 0;
        border-radius: 10px; /* Add this line */
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
        top: 0px;
        right: 10px;
        font-size: 2em;
        z-index: 20000000;
        color: #ffc715;
        cursor: pointer;
        background: none;
        border: none;
        padding: 0;
    }

    .popup-title {
        font-size: 1.3em;
        color: #ffc715;
        margin: 20px auto 10px auto;
    }

    .popup-description {
        font-size: 1em;
        color: #ffffff;
        margin-bottom: 15px;
    }

    .popup-detail a {
        color: #ffc715;
        text-decoration: none;
    }

    .popup-detail a:hover {
        text-decoration: underline;
    }

    .popup-badges {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .popup-detail {
        font-size: 0.8em;
        color: #bbbbbb;
        margin: 0;
    }

    .popup-detail-title {
        font-size: 0.8em;
        color: #ffffff;
        margin-top: 15px;
    }

    h2 {
        line-height: 1.2;
    }

    .badge {
        font-size: 0.8em;
        padding: 5px 10px;
        border-radius: 15px;
        color: #ffffff;
        background: none;
        border: 1px solid #ffc715;
        white-space: nowrap;
    }
</style>