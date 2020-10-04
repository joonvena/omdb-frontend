import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import Input from './Input';

test('Search button should have correct label', () => {
  const findMovie = () => {};
  const c = render(<Input findMovie={findMovie} />);
  const button = c.getByTestId('submit');
  expect(button).toHaveTextContent('Find movie');
});

test('Input field should have correct placeholder', () => {
  const findMovie = () => {};
  const c = render(<Input findMovie={findMovie} />);
  const input = c.getByTestId('movie_search');
  expect(input).toHaveAttribute('placeholder', 'Title of movie...');
});

test('Search button should be disabled if input field is empty', () => {
  const findMovie = () => {};
  const c = render(<Input findMovie={findMovie} />);
  const button = c.getByTestId('submit');
  expect(button).toHaveAttribute('disabled');
});

test('Search button should be clickable if input is not empty', () => {
  const findMovie = () => {};
  const c = render(<Input findMovie={findMovie} />);
  const input = c.getByTestId('movie_search');
  fireEvent.change(input, { target: { value: 'Cobra' } });
  expect(input).not.toHaveAttribute('disabled');
});

test('Input field should have focus when component is rendered', () => {
  const findMovie = () => {};
  const c = render(<Input findMovie={findMovie} />);
  const input = c.getByTestId('movie_search');
  expect(input).toHaveFocus();
});
