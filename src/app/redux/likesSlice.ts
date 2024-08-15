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

        if (state[id].liked) {

          state[id].count -= 1;
          state[id].liked = false;
        } else {

          state[id].count += 1;
          state[id].liked = true;
        }
      } else {

        state[id] = { count: 1, liked: true };
      }
    },
  },
});

export const { toggleLike } = likesSlice.actions;
export default likesSlice.reducer;
