<script>
  import posthog from 'posthog-js'
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  
  onMount(() => {
    if (browser) {
      posthog.init(
        'phc_jf68iLEJgcEqPBIrChCx9OWpsW9U8tWVTmaPixNpItj',
        {
          api_host: 'https://eu.i.posthog.com',
          person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
        }
      )
    }
    return
  });
  let { children } = $props();
</script>

{@render children()}
