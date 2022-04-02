<script>
  export let items;
</script>

{#each items as item}
<div class="box">
  <slot prop={item}></slot>
</div>
{/each}