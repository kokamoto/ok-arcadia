<script>
  import LabLayout from '$lib/components/layouts/LabLayout.svelte';
  import ListCollection from '$lib/components/collections/ListCollection.svelte';
  import CardCollection from '$lib/components/collections/CardCollection.svelte';

  import data from '../../../static/data/test_recognized.json';

  const items = data.slice(0, 5);

</script>
<LabLayout title="Collections">
  <h2>List Collection</h2>
  <ListCollection items={items} let:prop={competitor}>
    <div>{competitor.firstname} {competitor.lastname}</div>
  </ListCollection>

  <h2>Card Collection</h2>
  <CardCollection items={items} let:prop={competitor}>
    <div>{competitor.firstname} {competitor.lastname}</div>
  </CardCollection>
</LabLayout>