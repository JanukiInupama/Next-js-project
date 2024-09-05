import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';  
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Card from '../Card';
import { toggleLike } from '../../redux/likesSlice';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt} /> 
  },
}));

jest.mock('../Modal', () => {
  return ({ children, isOpen, onClose }: any) => (
    isOpen ? <div data-testid="modal">{children}</div> : null
  );
});

const mockStore = configureStore([]);

describe('Card Component', () => {
  const initialState = {
    likes: {
      cards: [
        { id: '1', count: 5, liked: false }
      ]
    }
  };
  
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it('renders card content correctly', () => {
    render(
      <Provider store={store}>
        <Card id="1" imageSrc="/test-image.jpg" altText="Test Image" />
      </Provider>
    );

    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test Image');
    expect(screen.getByRole('heading', { level: 2, name: 'Test Image' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /like/i })).toBeInTheDocument();
    expect(screen.getByText('5 likes')).toBeInTheDocument();
  });

  it('handles like button click', () => {
    render(
      <Provider store={store}>
        <Card id="1" imageSrc="/test-image.jpg" altText="Test Image" />
      </Provider>
    );

    const likeButton = screen.getByRole('button', { name: /like/i });
    fireEvent.click(likeButton);

    expect(store.dispatch).toHaveBeenCalledWith(toggleLike('1'));
  });

  it('opens modal on image click', () => {
    render(
      <Provider store={store}>
        <Card id="1" imageSrc="/test-image.jpg" altText="Test Image" />
      </Provider>
    );

    const image = screen.getByRole('img');
    fireEvent.click(image);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });
});