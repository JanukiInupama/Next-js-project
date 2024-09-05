import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import HomeWrapper from '../HomeWrapper';
import { configureStore } from '@reduxjs/toolkit';
import likesReducer, { CardData, LikesState } from '../../redux/likesSlice';

const createMockStore = (state: LikesState) => {
  return configureStore({
    reducer: {
      likes: likesReducer,
    },
    preloadedState: { likes: state },
  });
};

const sampleMovies: CardData[] = [
  { id: '1', imageSrc: '/image1.jpg', altText: 'Movie 1', count: 5, liked: false },
  { id: '2', imageSrc: '/image2.jpg', altText: 'Movie 2', count: 10, liked: true },
  { id: '3', imageSrc: '/image3.jpg', altText: 'Movie 3', count: 0, liked: false },
];

describe('HomeWrapper', () => {
  const originalLocation = window.location;
  let reloadMock: jest.Mock;

  beforeAll(() => {
    reloadMock = jest.fn();
    delete (window as any).location;
    window.location = { ...originalLocation, reload: reloadMock };
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  beforeEach(() => {
    reloadMock.mockClear();
  });

  test('renders Home component without errors when initialError is null', () => {
    render(<HomeWrapper initialMovies={sampleMovies} initialError={null} />);

    expect(screen.getByText(/Home/i)).toBeInTheDocument();

    sampleMovies.forEach(movie => {
      expect(screen.getByAltText(movie.altText)).toBeInTheDocument();
    });
  });

  test('displays error modal when there is an initial error', () => {
    render(<HomeWrapper initialMovies={[]} initialError="Failed to load movies" />);

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Failed to load movies')).toBeInTheDocument();

    expect(screen.getByText('Try Again')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  test('closes error modal when "Close" button is clicked', () => {
    render(<HomeWrapper initialMovies={[]} initialError="Failed to load movies" />);

    fireEvent.click(screen.getByText('Close'));

    expect(screen.queryByText('Error')).not.toBeInTheDocument();
  });

  test('reloads the page when "Try Again" button is clicked', () => {
    render(<HomeWrapper initialMovies={[]} initialError="Failed to load movies" />);

    fireEvent.click(screen.getByText('Try Again'));

    expect(reloadMock).toHaveBeenCalled();
  });

  test('dispatches setCards action with initialMovies', () => {
    const store = createMockStore({
      cards: [],
      status: 'idle',
      error: null,
    });

    render(
      <Provider store={store}>
        <HomeWrapper initialMovies={sampleMovies} initialError={null} />
      </Provider>
    );

    const state = store.getState().likes as LikesState;
    expect(state.cards).toEqual(sampleMovies);
  });
});