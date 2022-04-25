<header>
  <div class="container">
    <h1><a href="/">OK-ARCADIA</a></h1>
  </div>
</header>
<div class="content">
  <slot></slot>
</div>
<footer></footer>

<style lang="scss">
  header {
    background-color: #333;
    color: #fff;
    .container {
      display: flex;
    }
    h1 {
      font-size: 1.2rem;
      padding: 0.5rem 0;
      font-family: Teko, sans-serif;
    }
  }
</style>