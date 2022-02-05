<script>
  let name = "World";
</script>

<h1 class="experiment">Experiment #001</h1>
<h2>Hello World!</h2>

<section class="introduction">
  <p>The first experiment focuses on developing a template/layout for future lab experiments.</p>
</section>

<section class="input">
  <h3>Input</h3>
  <input bind:value={name}/>
</section>

<section class="output">
  <h3>Output</h3>
  <p>Hello {name}!</p>
</section>