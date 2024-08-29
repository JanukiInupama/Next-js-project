'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import likesReducer, { setCards, LikesState, CardData } from '../redux/likesSlice';
import Home from './Home';

interface HomeWrapperProps {
  initialMovies: CardData[];
}

const HomeWrapper: React.FC<HomeWrapperProps> = ({ initialMovies }) => {
  const initialState: LikesState = {
    cards: initialMovies,
    status: 'succeeded',
    error: null,
  };

  const store = configureStore({
    reducer: {
      likes: likesReducer,
    },
    preloadedState: {
      likes: initialState,
    },
  });

  store.dispatch(setCards(initialMovies));

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default HomeWrapper;