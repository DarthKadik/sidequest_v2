<script>
    import Ideas from '$lib/components/100ideas.svelte';
    import DefaultFooter from '$lib/components/DefaultFooter.svelte';
    import ideas from '$lib/utils/ideas.json';

    // Use ideas from JSON file
    const ideaData = {
        Heading: ideas.data.Heading,
        Description: ideas.data.Description,
        ideas: ideas.data.ideas
    };
</script>

<svelte:head>
  <title>100ideas - Sidequest</title>
</svelte:head>  

<div class="global-container">
  <Ideas id="ideas-section" {ideaData} />
  <DefaultFooter />
</div>
