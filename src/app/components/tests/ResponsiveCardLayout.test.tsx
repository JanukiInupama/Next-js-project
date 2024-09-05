import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';  
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import likesReducer, { LikesState, CardData } from '../../redux/likesSlice';
import ResponsiveCardLayout from '../ResponsiveCardLayout';

const createMockStore = (state: LikesState) => {
  return configureStore({
    reducer: {
      likes: likesReducer,
    },
    preloadedState: { likes: state },
  });
};

const sampleCards: CardData[] = [
  { id: '1', imageSrc: 'image1.jpg', altText: 'Image 1', count: 5, liked: false },
  { id: '2', imageSrc: 'image2.jpg', altText: 'Image 2', count: 10, liked: true },
  { id: '3', imageSrc: 'image3.jpg', altText: 'Image 3', count: 0, liked: false },
];

describe('ResponsiveCardLayout', () => {
  test('renders cards correctly in desktop view', () => {
    const store = createMockStore({
      cards: sampleCards,
      status: 'succeeded',
      error: null,
    });

    render(
      <Provider store={store}>
        <ResponsiveCardLayout />
      </Provider>
    );

    sampleCards.forEach(card => {
      expect(screen.getByAltText(card.altText)).toBeInTheDocument();
    });
  });

  test('renders loading state correctly', () => {
    const store = createMockStore({
      cards: [],
      status: 'loading',
      error: null,
    });

    render(
      <Provider store={store}>
        <ResponsiveCardLayout />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state correctly', () => {
    const store = createMockStore({
      cards: [],
      status: 'failed',
      error: 'Failed to load cards',
    });

    render(
      <Provider store={store}>
        <ResponsiveCardLayout />
      </Provider>
    );

    expect(screen.getByText('Error: Failed to load cards')).toBeInTheDocument();
  });

  test('handles carousel navigation on mobile', () => {
    const store = createMockStore({
      cards: sampleCards,
      status: 'succeeded',
      error: null,
    });

    global.innerWidth = 500;

    render(
      <Provider store={store}>
        <ResponsiveCardLayout />
      </Provider>
    );

    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();

    fireEvent.click(screen.getByText('>'));


  });
});
