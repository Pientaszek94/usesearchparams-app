import React from 'react';
import { render, screen } from '@testing-library/react';
import { Home } from './pages';

test('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/name/i);
  expect(linkElement).toBeInTheDocument();
});
