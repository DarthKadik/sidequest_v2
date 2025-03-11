<script>
  export let title = 'We are not a school, but you will learn a lot';
  export let text = 'PS: if you don’t have an idea in mind, we can help!';
  export let cards = [
    {
      title: 'Card Title',
      description: '<p>test</p>',
    },
  ];
</script>

<section class="why">
  <!-- Title -->
  <h2>{title}</h2>
  <div class="grid">
    {#each cards as card}
      <div class="card">
        <h4>{card.title}</h4>
        <div>{@html card.description}</div>
      </div>
    {/each}
  </div>
  <p class="description standard-text">{text}</p>
</section>

<style>
  .why {
    background: none;
    padding: 80px 20px;
    text-align: center;
    font-family: 'Poppins', sans-serif;
  }

  .why h2 {
    font-size: 2.5rem;
    font-family: "Almarai", serif;
    font-weight: 700;
    color: var(--yellow);
    margin-bottom: 50px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
  }

  .card {
    background: #141414;
    border-bottom: 3px solid var(--yellow);
    border-top: 3px solid var(--yellow);
    padding: 40px;
    border-radius: 8px;
    text-align: justify;
  }

  .card h4 {
    text-align: center;
    font-size: 1.2rem;
    color: var(--yellow);
    margin-bottom: 15px;
  }

  .why .description {
    max-width: 700px;
    margin: 50px auto 0;
    font-size: 1rem;
    line-height: 1.6;
    color: var(--gray);
  }
</style>
