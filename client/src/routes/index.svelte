<script lang="ts">
  type Place = {
    title: string;
    description: string;
    url: string;
    themeClass: string;
    rank: number;
  }

  const PLACES: Place[] = [{
    title: 'The LAB',
    description: 'Explore the latest experiments.',
    url: '/lab',
    themeClass: 'lab',
    rank: 1
  }, {
    title: 'The DOJANG',
    description: 'Enter the Taekwondo studio.',
    url: '/dojang',
    themeClass: 'dojang',
    rank: 2
  }, {
    title: 'The KITCHEN',
    description: `See what's cooking.`,
    url: '/kitchen',
    themeClass: 'kitchen',
    rank: 3
  }, {
    title: `The VISITOR'S CENTER`,
    description: 'Get information here.',
    url: '/visitors-center',
    themeClass: 'visitors-center',
    rank: 4
  }];

  type FeaturedPage = {
    place: string;
    title: string;
    url: string;
  }

  const FEATURED_PAGES: FeaturedPage[] = [{
    place: 'Dojang',
    title: '2021 USA Poomsae Rankings',
    url: '/dojang/poomsae-rankings/usa'
  }, {
    place: 'Lab',
    title: 'Experiment #001: Hello World!',
    url: '/lab/001'
  }]
</script>

<!-- src/routes/index.svelte -->
<svelte:head>
	<title>OK Arcadia: Welcome!</title>
</svelte:head>

<section class="hero container">
  <div class="hero-body">
    <h1 class="title">
      <span class="pre">Welcome to </span><span class="core">OK-ARCADIA!</span>
    </h1>
  </div>
</section>

<section class="container">
  <nav class="places">
    {#each PLACES as place}
	  <a class="place {place.themeClass}" href={place.url}>
      <h1>{place.title}</h1>
      <p>{place.description}</p>
    </a>
    {/each}
  </nav>
</section>

<section class="container featured">
  <h2>Featured</h2>
  {#each FEATURED_PAGES as page}
  <a class="page" href={page.url} >
    <h1>{page.place}</h1>
    <h2>{page.title}</h2>
  </a>
  {/each}
</section>

<style lang="scss">
  $border-radius: 5px;

  .hero {
    height: 10rem;
    text-align: center;
    .title {
      height: 10rem;
      padding-top: 2rem;
      span {
        display: block;
      }
      .pre {
        font-family: 'Dancing Script', serif;
        font-size: 2rem;
        color: red;
      }
      .core {
        font-family: Teko, sans-serif;
        font-size: 4rem;
        line-height: 3rem;
      }
    }
  }

  section {
    > h2 {
      font-size: 1.2rem;
    }
  }
  section + section {
    margin-top: 1.0rem
  }

  .places {
    display: flex;
    // flex-wrap: wrap;
    gap: 1rem;
    .place {
      display: block;
      flex: 1;
      border: 1px solid #333;
      border-radius: $border-radius;
      min-width: 15rem;
      h1 {
        font-family: Teko, sans-serif;
        font-size: 1.4rem;
        padding: 0.75rem;
        color: #fff;
        background-color: #999;
        border-top-left-radius: $border-radius;
        border-top-right-radius: $border-radius;
      }
      p {
        padding: 0.75rem;
        font-size: 1.0rem;
        color: #333;
      }
      &.lab h1 {
        background-color: var(--lab-primary-color);
      }
      &.dojang h1 {
        background-color: var(--dojang-primary-color);
      }
      &.kitchen h1 {
        background-color: var(--kitchen-primary-color);
      }
      &.visitors-center h1 {
        background-color: var(--visitors-center-primary-color);
      }
    }
  }
</style>
