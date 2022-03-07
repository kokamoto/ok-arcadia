<!-- RankingListItem.svelte-->
<script>
  export let name = undefined;
  export let points = undefined;
  export let rank = undefined;
</script>

<div class="box mb-0">
  <article class="media">
    <div class="media-left">
      {rank}
    </div>
    <div class="media-content has-text-weight-bold">
      {name}
    </div>
    <div class="media-right">
      {points}
    </div>
  </article>
</div>
