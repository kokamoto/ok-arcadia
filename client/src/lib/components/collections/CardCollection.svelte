<script>
  export let items;
</script>
<div class="columns is-multiline">
{#each items as item}
<div class="column is-one-quarter">
  <div class="box">
  <slot prop={item}></slot>
  </div>
</div>
{/each}
</div>