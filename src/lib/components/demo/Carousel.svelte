<script lang="ts">
    import Card from './Card.svelte';
    import { onDestroy, onMount } from 'svelte';

    interface Project {
        name: string;
        title: string;
        description: string;
        image: string;
        tags: string[];
    }

    export let projects: Project[];
	export let direction: 'up' | 'down';
    export let showPopup: (project: Project) => void;;
    let container: HTMLElement | null = null;
    let animation: Animation | null = null;

    const scrollUp = [
        { transform: 'translateY(0)' },
        { transform: 'translateY(calc(-50%))' }
    ];

    const scrollDown = [
        { transform: 'translateY(calc(-50%))' },
        { transform: 'translateY(0)' }
    ];

     const animationTiming = {
        duration: 200000,
        iterations: Infinity,
        easing: 'linear'
    };

    function startAnimation(): void {
        if (container && !animation) {
			if(direction === "up"){
				animation = container.animate(scrollUp, animationTiming);
			}
			if(direction === "down"){
            	animation = container.animate(scrollDown, animationTiming);
			}
        }
    }
     function stopAnimation(): void {
        if (animation) {
			animation.pause();
        }
    }
	function resumeAnimation(): void {
        if (animation) {
			animation.play();
        }
    }

    onMount(() => {
		startAnimation();
    });

	$: if (projects) {
        startAnimation();
    }

	export {stopAnimation, resumeAnimation};

</script>

<div class="carousel" >
    <div class="card-container" bind:this={container}>
        {#each Array(2) as _, i}
            {#each (direction === 'up' ? projects : projects.slice().reverse()) as project (project.id)}
                <Card {project} {showPopup} />
            {/each}
        {/each}
    </div>
    <div class="before"></div>
    <div class="after"></div>
</div>

<style>
	.carousel {
        position: relative;
        overflow: hidden;
        width: 26vw;
        padding: 10px;
        flex-shrink: 0;
        overflow-x: visible;
        display: flex;
        flex-direction: row;
        justify-items: center;
        justify-content: center;
    }

    .card-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        position: absolute;
        top: 0;
        will-change: transform;
        z-index: 1;
    }
	.before,
    .after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        height: 100px;
        z-index: 2;
        pointer-events: none;
    }

    .before {
        top: 0;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    }

    .after {
        bottom: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    }
</style>