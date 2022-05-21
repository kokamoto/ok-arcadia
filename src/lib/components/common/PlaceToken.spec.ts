/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import PlaceToken from './PlaceToken.svelte';

 test('contains proper class when rendered', () => {
   const {container} = render(PlaceToken, { name: "My Place" });
   expect(container.querySelector('.place-token')).toBeInTheDocument();
 });
 
 test('contains proper data-name when rendered', () => {
   const {container} = render(PlaceToken, { name: "My Place" });
   expect(container.querySelector('[data-name="My Place"]')).toBeInTheDocument();
 });

 test('displays first letter of name by default', () => {
   const name = 'My Place';
   const {container} = render(PlaceToken, { name });
   expect(container.querySelector('.place-token').textContent).toBe(name[0]);
 });

 