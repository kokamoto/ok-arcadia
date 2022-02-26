/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import LabLayout from './LabLayout.svelte';

test('shows proper title when rendered', () => {
  const {getByText} = render(LabLayout, { title: "My Title"});
  expect(getByText('My Title')).toBeInTheDocument();
});

