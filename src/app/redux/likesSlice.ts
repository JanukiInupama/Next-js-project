import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LikeState {
  count: number;
  liked: boolean;
}

interface LikesState {
  [key: string]: LikeState;
}

const initialState: LikesState = {};

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state[id]) {
        // Toggle the like status and adjust the count accordingly
        if (state[id].liked) {
          // If already liked, decrement the count and set liked status to false
          state[id].count -= 1;
          state[id].liked = false;
        } else {
          // If not liked, increment the count and set liked status to true
          state[id].count += 1;
          state[id].liked = true;
        }
      } else {
        // Initialize the like state if not present
        state[id] = { count: 1, liked: true };
      }
    },
  },
});

export const { toggleLike } = likesSlice.actions;
export default likesSlice.reducer;
