<script>
  export let name;
  export let color = 'rgb(51, 51, 51)';
  export let backgroundColor = 'rgb(255, 255, 255)';
  export let borderColor = 'rgb(51, 51, 51)';

  $: text = name[0];
</script>

<div class="place-token" data-name="{name}" style="color: {color}; background-color: {backgroundColor}; border-color: {borderColor}">{text}</div>

<style lang="scss">
  $size: 50px;
  $border-size: 4px;
  .place-token {
    font-family: Teko, sans-serif;
    height: $size;
    width: $size;
    border: solid $border-size;
    border-radius: 25px;
    font-size: 2.7rem;
    text-align: center;
    line-height: $size;
  }
</style>