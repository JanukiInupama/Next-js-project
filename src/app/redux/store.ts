import { configureStore } from '@reduxjs/toolkit';
import likesReducer, { LikesState } from '../redux/likesSlice';

const createMockStore = (state: LikesState) => {
  return configureStore({
    reducer: {
      likes: likesReducer,
    },
    preloadedState: { likes: state }, // Ensure 'likes' is used correctly
  });
};
