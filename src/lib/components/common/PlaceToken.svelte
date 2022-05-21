<script>
  export let name;

  $: text = name[0];
</script>

<div class="place-token" data-name="{name}">{text}</div>

<style lang="scss">
  $size: 50px;
  $border-size: 4px;
  .place-token {
    font-family: Teko, sans-serif;
    height: $size;
    width: $size;
    border: solid $border-size #333;
    border-radius: 25px;
    background-color: yellow;
    font-size: 2.7rem;
    color: #333;
    text-align: center;
    line-height: $size;
  }
</style>