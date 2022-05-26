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

test('the foreground color should be rgb(51, 51, 51) by default',  () => {
  const {container} = render(PlaceToken, { name: "My Place" });
  const elem = container.querySelector('.place-token');
  const style = getComputedStyle(elem);
  expect(style.color).toBe('rgb(51, 51, 51)');
});

test('should be able to set foreground color',  () => {
  const {container} = render(PlaceToken, { name: "My Place", color: "rgb(3, 101, 3)" });
  const elem = container.querySelector('.place-token');
  const style = getComputedStyle(elem);
  expect(style.color).toBe('rgb(3, 101, 3)');
});

test('the background color should be rgb(255, 255, 255) by default',  () => {
  const {container} = render(PlaceToken, { name: "My Place" });
  const elem = container.querySelector('.place-token');
  const style = getComputedStyle(elem);
  expect(style.backgroundColor).toBe('rgb(255, 255, 255)');
});

test('should be able to set background color',  () => {
  const {container} = render(PlaceToken, { name: "My Place", backgroundColor: "rgb(3, 101, 3)" });
  const elem = container.querySelector('.place-token');
  const style = getComputedStyle(elem);
  expect(style.backgroundColor).toBe('rgb(3, 101, 3)');
});

test('the border color should be rgb(51, 51, 51) by default',  () => {
  const {container} = render(PlaceToken, { name: "My Place" });
  const elem = container.querySelector('.place-token');
  const style = getComputedStyle(elem);
  expect(style.borderColor).toBe('rgb(51, 51, 51)');
});

test('should be able to set border color',  () => {
  const {container} = render(PlaceToken, { name: "My Place", borderColor: "rgb(3, 101, 3)" });
  const elem = container.querySelector('.place-token');
  const style = getComputedStyle(elem);
  expect(style.borderColor).toBe('rgb(3, 101, 3)');
});
 