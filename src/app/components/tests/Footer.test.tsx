import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../Footer';

test('renders Footer component', () => {
  const { container } = render(<Footer />);

  const footerElement = container.querySelector('footer');
  expect(footerElement).toBeInTheDocument();

  expect(footerElement).toHaveClass('bg-blue-300');
  expect(footerElement).toHaveClass('w-full');
  expect(footerElement).toHaveClass('h-20');
});
