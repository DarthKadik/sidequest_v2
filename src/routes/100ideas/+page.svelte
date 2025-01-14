<script>
    import Ideas from '$lib/components/100ideas.svelte';
    import DefaultFooter from '$lib/components/DefaultFooter.svelte';

    export let data;
    const { ideaData } = data;
</script>

<svelte:head>
  <title>100ideas - Sidequest</title>
</svelte:head>  

<div class="global-container">
  <Ideas id="ideas-section" {ideaData} />
  <DefaultFooter />
</div>
