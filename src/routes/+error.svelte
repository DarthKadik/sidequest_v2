<script>
  export let error;
  export let status;

  // Log error details for debugging
  console.error('Error details:', { status, error });
</script>

<div class="error-page">
  {#if status === 404}
    <img src="/404Finland.png" alt="404 error" class="error-image" />
    <h1>Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
  {:else}
    <h1>An Error Occurred</h1>
    <p>{error?.message || 'Something went wrong.'}</p>
    <p>{error ? '' : 'No additional error details are available.'}</p>
  {/if}
  <a href="/" class="home-link">Go Back to Home</a>
</div>

<style>
  .error-page {
    text-align: center;
    padding: 2rem;
    font-family: 'Poppins', sans-serif;
  }

  .error-image {
    max-width: 100%;
    max-height: 80vh;
    height: auto;
    margin-bottom: 2rem;
  }

  .error-page h1 {
    font-size: 2rem;
    color: var(--yellow);
    margin-bottom: 1rem;
  }

  .error-page p {
    font-size: 1rem;
    color: white;
    margin-bottom: 2rem;
  }

  .home-link {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: var(--yellow);
    color: var(--black);
    text-decoration: none;
    border-radius: 5px;
  }

  .home-link:hover {
    background-color: #e6b400;
  }
</style>
