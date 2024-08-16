import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface LikeState {
  count: number;
  liked: boolean;
}

interface CardData {
  id: string
  imageSrc: string;
  altText: string;
}

interface LikesState {
  likes: { [key: string]: LikeState };
  cards: CardData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LikesState = {
  likes: {},
  cards: [],
  status: 'idle',
  error: null
};

export const fetchCards = createAsyncThunk('likes/fetchCards', async () => {
  const response = await fetch('https://hp-api.onrender.com/api/characters');
  const data = await response.json();
  return data.slice(0, 3).map((char: any) => ({
    id: char.id || `${char.name}-${Math.random()}`, // Use a unique id or generate one
    imageSrc: char.image,
    altText: char.name,
  }));
});


const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.likes[id]) {
        if (state.likes[id].liked) {
          state.likes[id].count -= 1;
          state.likes[id].liked = false;
        } else {
          state.likes[id].count += 1;
          state.likes[id].liked = true;
        }
      } else {
        state.likes[id] = { count: 1, liked: true };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cards = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch cards';
      });
  },
});

export const { toggleLike } = likesSlice.actions;
export default likesSlice.reducer;