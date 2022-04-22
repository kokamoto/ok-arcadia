<!-- src/routes/index.svelte -->
<svelte:head>
	<title>OK Arcadia: Welcome!</title>
</svelte:head>

<section class="hero container">
  <div class="hero-body">
    <p class="title">
      Welcome to OK Arcadia!
    </p>
    <p class="subtitle">
      Hero subtitle
    </p>
  </div>
</section>

<section class="container">
  <h2>Places</h2>
  <nav class="places">
	  <a class="place" href="lab">
      <h1>The LAB</h1>
      <p>Explore the latest experiments.</p>
    </a>
    <a class="place" href="dojang">
      <h1>The DOJANG</h1>
      <p>Enter the Taekwondo studio.</p>
    </a>
	  <a class="place" href="kitchen">
      <h1>The KITCHEN</h1>
      <p>See what's cooking.</p>
    </a>
	  <a class="place" href="about">
      <h1>The VISITOR'S CENTER</h1>
      <p>Get information here.</p>
    </a>
  </nav>
</section>

<section class="container featured">
  <h2>Featured</h2>
  <a class="page" href="dojang/poomsae-rankings/usa" >
    <h1>Dojang</h1>
    <h2>2021 USA Poomsae Rankings</h2>
  </a>
  <a class="page" href="lab/001" >
    <h1>Lab</h1>
    <h2>Experiment #001: Hello World!</h2>
  </a>
</section>

<style lang="scss">
  section {
    h2 {
      font-size: 1.2rem;
      border-bottom: 1px solid gray;
    }
    .places {
      .place {
        display: block;
      }
      .place + .place {
        margin-top: 1rem;
      }
    }
  }

  section + section {
    margin-top: 1.0rem
  }
</style>
