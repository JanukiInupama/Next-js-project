'use client';

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import likesReducer, { setCards, LikesState, CardData } from '../redux/likesSlice';
import Home from './Home';

interface HomeWrapperProps {
  initialMovies: CardData[];
  initialError: string | null;
}

const HomeWrapper: React.FC<HomeWrapperProps> = ({ initialMovies, initialError }) => {
  const [error, setError] = useState(initialError);

  const initialState: LikesState = {
    cards: initialMovies,
    status: initialError ? 'failed' : 'succeeded',
    error: initialError,
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

  const handleClose = () => {
    setError(null);
  };

  const handleTryAgain = () => {
    window.location.reload();
  };

  return (
    <Provider store={store}>
      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Error</h2>
            <p className="mb-4">{error}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleTryAgain}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Try Again
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <Home />
    </Provider>
  );
};

export default HomeWrapper;