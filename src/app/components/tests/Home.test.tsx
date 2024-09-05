import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../Home';
import Header from '../Header';
import Banner from '../Banner';
import Text from '../Text';
import ResponsiveCardLayout from '../ResponsiveCardLayout';
import Footer from '../Footer';

jest.mock('../Header');
jest.mock('../Banner');
jest.mock('../Text');
jest.mock('../ResponsiveCardLayout');
jest.mock('../Footer');

test('renders Home component with all sections', () => {
  const { container } = render(<Home />);

  expect(Header).toHaveBeenCalled();

  expect(Banner).toHaveBeenCalled();

  expect(Text).toHaveBeenCalledTimes(2);

  expect(ResponsiveCardLayout).toHaveBeenCalled();

  expect(Footer).toHaveBeenCalled();

  expect(container.firstChild).toHaveClass('min-h-screen flex flex-col');
  expect(container.querySelector('main')).toHaveClass('md:space-y-6');
});
