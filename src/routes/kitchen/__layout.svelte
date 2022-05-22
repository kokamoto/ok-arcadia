<script>
  import PlaceToken from "$lib/components/common/PlaceToken.svelte";
</script>
<a class="top-nav" href="/kitchen"><PlaceToken 
  color="var(--kitchen-primary-color)"
  borderColor="var(--kitchen-primary-color)"
  backgroundColor="var(--kitchen-background-color)"
  name="Kitchen"/></a>
<slot></slot>
