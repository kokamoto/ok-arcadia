<!-- RankingListItem.svelte-->
<script>
  export let name = undefined;
  export let points = undefined;
  export let rank = undefined;
</script>

<div class="box">
  <article class="ranking">
    <div class="rank">
      {rank}
    </div>
    <div class="name">
      {name}
    </div>
    <div class="points">
      {points}
    </div>
  </article>
</div>

<style lang="scss">
  .box {
    border: 1px solid #333;
    border-radius: 5px;
    margin-bottom: 1rem;
    line-height: 3rem;
  }
  .ranking {
    display: flex;
    align-items: center;
    border-radius: 5px;
    background-color: #eee;
  }
  .rank {
    text-align: center;
    height: 2.5rem;
    width: 2.5rem;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 1.25rem;
    line-height: 2.5rem;
    margin-left: 0.25rem;
  }
  .name {
    padding-left: 0.5rem;
    flex: 1;
  }
  .points {
    padding-right: 0.5rem;
  }
</style>