<script>
  export let title = 'roadmap';
  export let steps = [
    {
      title: 'week x',
      description: '<p>test</p>',
    },
  ];
  </script>
  
<style>
  .roadmap {
    background: none;
    padding: 80px 20px;
    text-align: center;
    font-family: 'Poppins', sans-serif;
  }

  .roadmap h2 {
    font-family: "Almarai", serif;
    font-weight: 700;
    font-size: 2.5rem;
    color: var(--yellow);
    margin-bottom: 50px;
  }

  .timeline {
    max-width: 450px;
    margin: 0 auto;
    position: relative;
  }

  .timeline-content {
    position: relative;
  }

  .timeline-content::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background: var(--yellow);
  }

  .timeline-step {
    position: relative;
    margin-bottom: 42px;
    text-align: left;
    color: var(--yellow);
  }

  .timeline-step:last-child::after {
    content: "";
    position: absolute;
    left: 20px;
    bottom: 0;
    height: 0;
    width: 3px;
    background: #0f0f0f;
  }

  .timeline-step h3 {
    font-size: 1.3rem;
    color: var(--yellow);
    margin-left: 38px;
    line-height: 28.17px;
  }

  .timeline-step p {
    font-size: 0.95rem;
    line-height: 1.4;
    margin-left: 38px;
    color: white;
  }

  .timeline-step::before {
    content: "";
    position: absolute;
    left: -12px;
    top: 0;
    width: 25px;
    height: 25px;
    background: #0a0a0a;
    border: 2px solid var(--yellow);
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    .timeline-content::before {
      left: 12px;
    }

    .timeline-step::before {
      left: 0;
    }

    .timeline-step:last-child::after {
      left: 40px;
    }
  }
</style>
  
  <section class="roadmap">
    <h2>{title}</h2>
    <div class="timeline">
      <div class="timeline-content">
        {#each steps as step}
          <div class="timeline-step">
            <h3>{step.title}</h3>
            <p>{@html step.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  