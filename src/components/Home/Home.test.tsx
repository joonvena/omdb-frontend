import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import Home from './Home';

test('Page should contain H1 element with correct text', async () => {
  const c = render(
    <Home
      findMovie={() => 'hello'}
      movies={null}
      pages={1}
      currentPage={1}
      loading={false}
    />
  );
  const title = await c.findByTestId('home_title');
  expect(title).toHaveTextContent('Find movie');
});
