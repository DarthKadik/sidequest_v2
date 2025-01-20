<!-- src/routes/[...catchall]/+page.svelte -->
<script>
  import { isPreviewing, Content } from "@builder.io/sdk-svelte";

  // this data comes from the function in +page.server.js, which runs on the server only
  export let data;

  // show unpublished content when in preview mode.
  const canShowContent = data.content || isPreviewing();
</script>

<main>
  <h1>Welcome to SvelteKit</h1>
  <h2>Below is your Builder Content:</h2>
  <!-- TO DO: Add your Public API Key in <Content/>-->
  {#if canShowContent}
    <div>page Title: {data.content?.data?.title || "Unpublished"}</div>
    <Content
      model="custome-page"
      content={data.content}
      apiKey="7bff0c6c736b40dbaef3300a46e5008d"
    />
  {:else}
    Content Not Found
  {/if}
</main>