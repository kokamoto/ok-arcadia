<svelte:head>
	<title>OK Arcadia: The Dojang</title>
</svelte:head>

<script lang="ts">
	import RankingListItem from '../../../lib/components/app/dojang/RankingListItem.svelte';
	import { CompetitorRank, generateCompetitorDataSourceManager } from './store';
	import { readable, Readable } from "svelte/store";
  import { onMount } from 'svelte';
  import type { DataSourceManager } from '$lib/modules/data-source';

	let manager:DataSourceManager<CompetitorRank>;
	let competitors: Readable<CompetitorRank[]> = readable([]);

	onMount(async () => {
    await generateCompetitorDataSourceManager({
      sourceUrl: '/data/test_recognized.json',
      type: 'recognized',
      gender: 'Female',
      division: 'Cadet'
    }).subscribe(m => {
      manager = m;
      competitors = m.getStore();
		  manager.fetch();
    });
	});
	
</script>

<h1 class="title">The US National Poomsae Rankings</h1>

<div class="columns">
	<div class="column">
		<h2 class="subtitle">Recognized Poomsae</h2>

		<h3>Female Cadet</h3>
		<div id="rp-female-cadet">
			{#each $competitors as competitor, i}
			<RankingListItem rank="{i + 1}" name="{competitor.name}" points="{competitor.totalpoints}"/>
			{/each}
		</div>
	</div>
	<div class="column">
		<h2 class="subtitle">Freestyle Poomsae</h2>
	</div>
</div>

