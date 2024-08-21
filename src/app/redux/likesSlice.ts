import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface CardData {
  id: string;
  imageSrc: string;
  altText: string;
  count: number;
  liked: boolean;
}

interface LikesState {
  cards: CardData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LikesState = {
  cards: [],
  status: 'idle',
  error: null
};

export const fetchCards = createAsyncThunk('likes/fetchCards', async () => {
  const response = await fetch('https://hp-api.onrender.com/api/characters');
  const data = await response.json();
  return data.slice(0, 3).map((char: any) => ({
    id: char.id || `${char.name}-${Math.random()}`,
    imageSrc: char.image,
    altText: char.name,
    count: 0,
    liked: false,
  }));
});

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const card = state.cards.find(card => card.id === action.payload);
      if (card) {
        card.liked = !card.liked;
        card.count += card.liked ? 1 : -1;
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