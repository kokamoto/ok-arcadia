<svelte:head>
	<title>OK Arcadia: The Dojang</title>
</svelte:head>

<script>
	  import RankingListItem from '../../../lib/components/app/dojang/RankingListItem.svelte';
	  let competitors = [{
			division: "Cadet",
			belt: "Black",
			name: "Cadet One",
			gender: "Female",
			totalpoints: 1234
		}, {
			division: "Cadet",
			belt: "Black",
			name: "Cadet Two",
			gender: "Female",
			totalpoints: 1001
		}, {
			division: "Cadet",
			belt: "Black",
			name: "Cadet Three",
			gender: "Female",
			totalpoints: 923
		}, {
			division: "Cadet",
			belt: "Black",
			name: "Cadet One-Hundred",
			gender: "Female",
			totalpoints: 23
		}]
</script>

<h1 class="title">The US National Poomsae Rankings</h1>

<div class="columns">
	<div class="column">
		<h2 class="subtitle">Recognized Poomsae</h2>

		<h3>Female Cadet</h3>
		<div id="rp-female-cadet">
			{#each competitors as competitor, i}
			<RankingListItem rank="{i + 1}" name="{competitor.name}" points="{competitor.totalpoints}"/>
			{/each}
		</div>
	</div>
	<div class="column">
		<h2 class="subtitle">Freestyle Poomsae</h2>
	</div>
</div>

