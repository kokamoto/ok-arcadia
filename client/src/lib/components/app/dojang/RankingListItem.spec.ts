/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import RankingListItem from './RankingListItem.svelte';

test('shows proper name when rendered', async () => {
  const { getByText, component } = render(RankingListItem, { name: 'Anne Arcadia' });
  expect(getByText('Anne Arcadia')).toBeInTheDocument();

  await component.$set({ name: 'Billy Bearclaw'});
  expect(getByText('Billy Bearclaw')).toBeInTheDocument();
});

test('shows points when rendered', async () => {
  const { getByText, component } = render(RankingListItem, { points: 1234 });
  expect(getByText('1234')).toBeInTheDocument();

  await component.$set({ points: 2345});
  expect(getByText(2345)).toBeInTheDocument();
});

test('shows ranking when rendered', async () => {
  const { getByText, component } = render(RankingListItem, { rank: 1 });
  expect(getByText('1')).toBeInTheDocument();

  await component.$set({ rank: 99});
  expect(getByText('99')).toBeInTheDocument();
});