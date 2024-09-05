import { render } from '@testing-library/react';
import Header from '../Header';
import '@testing-library/jest-dom';


test('renders Header component with correct styles', () => {
  const { container } = render(<Header />);

  const headerElement = container.querySelector('header');
  expect(headerElement).toHaveClass('bg-blue-300');
});
 