<script>
    // @ts-ignore
    import Application from '$lib/components/Application.svelte';
    import DefaultFooter from '$lib/components/DefaultFooter.svelte';

    // @ts-ignore
    export let data;
    const { formData } = data;
</script>

<svelte:head>
  <title>Apply - Sidequest</title>
</svelte:head>  

<div class="global-container">
  <Application id="signup" {formData} />
  <DefaultFooter />
</div>
