import React from 'react';
import { render } from '@testing-library/react';
import Banner from '../Banner';
import '@testing-library/jest-dom';


test('renders Banner component', () => {
  const { container } = render(<Banner />);

  const bannerElement = container.querySelector('.w-full');
  expect(bannerElement).toBeInTheDocument();

  const innerDivElement = container.querySelector('.bg-green-200');
  expect(innerDivElement).toBeInTheDocument();

  expect(innerDivElement).toHaveClass('h-64');
});
