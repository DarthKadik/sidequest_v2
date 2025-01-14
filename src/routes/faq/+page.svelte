<script>
    import Faq from '$lib/components/Faq.svelte';
    import DefaultFooter from '$lib/components/DefaultFooter.svelte';

    export let data;
    const { faqData } = data;
</script>

<svelte:head>
  <title>FAQ - Sidequest</title>
</svelte:head>  

<div class="global-container">
  <Faq id="faq-section" {faqData} />
  <DefaultFooter />
</div>
