<script>
    import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>About - Sidequest</title>
</svelte:head>

<div class="global-container">
  <section class="about">
    <h1>About Sidequest</h1>
    <p class="standard-text">Organized online by fellow tinkerers / hackers / artists from Finland free of charge & open for all.</p>
    <p class="standard-text">Sidequest is an online builder program designed to help you make any idea a real thing in 6 weeks.</p>
    <p class="standard-text">We will push you to set goals, stay accountable, and put in the needed work every week (approx. 4-8 hours) to make your idea real. You’ll be building your own thing alongside other excited doers, so hype and focus is guaranteed. All you got to do is have an idea and stay committed to it for 6 weeks.</p>
    <a href="/apply" class="apply-button">Apply &gt;</a>
    <blockquote>“I hate the program because it forces me to stay committed to what I chose for these six weeks—but that's exactly why I love it.. So basically I love it.”</blockquote>
    <blockquote>“I'm pretty thankful for this program since I know without it I would have never made my project real.”</blockquote>
    <h2>Q&A</h2>
    <h3>Is this seriously free?</h3>
    <p class="standard-text">Yes. 200%. Sidequest is brought together by excited fellow builders running a non-profit. We're funded by foundations + key partners who allow us to simply be a home to build your side quests</p>
    <h3>Who can apply?</h3>
    <p class="standard-text">Anyone. We welcome people of all ages, from all over the world in all stages of life.</p>
    <h3>Is Sidequest remote or IRL?</h3>
    <p class="standard-text">The program happens remotely for 6 weeks. You can attend from anywhere in the world. We will end the program with an optional in-person event in Helsinki (more details later).</p>
    <h3>What kind of ideas are accepted?</h3>
    <p class="standard-text">We don't care as long as it's something you're genuinely excited about! Your project could be about robotics, poems, AI, software, music, gardening — just apply.</p>
    <h3>Who is Sidequest exactly for?</h3>
    <p class="standard-text">For anyone who wants to build a project, has an idea to try out, is already building something but needs an extra push to get things done, or knows exactly what to do but wants to have more fun during the journey. You, your grandma, cousin, ex-colleague and gold fish are all invited to build!</p>
    <p class="standard-text">Organized online by fellow tinkerers / hackers / artists from Finland free of charge & open for all.</p>
    <p class="standard-text">Apply now or find us on Linkedin, X, and Instagram.</p>
    <p class="standard-text">:)</p>
  </section>
  <Footer links={[
    { label: 'Home', address: '/' },
    { label: 'FAQ', address: '/faq' },
    { label: 'Application', address: '/apply' }
  ]} />
</div>

<style>
  .about {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    text-align: left;
  }

  .about h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  .about p {
    font-size: 1rem;
    margin-bottom: 20px;
  }

  .apply-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: var(--yellow);
    color: var(--black);
    text-decoration: none;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  blockquote {
    font-style: italic;
    margin: 20px 0;
    padding: 10px 20px;
    border-left: 4px solid var(--yellow);
    background: #141414;
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.25rem;
    margin-top: 20px;
    margin-bottom: 10px;
  }
</style>
