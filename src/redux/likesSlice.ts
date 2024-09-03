import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CardData {
  id: string;
  imageSrc: string;
  altText: string;
  count: number;
  liked: boolean;
}

export interface LikesState {
  cards: CardData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LikesState = {
  cards: [],
  status: 'idle',
  error: null
};

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
    setCards: (state, action: PayloadAction<CardData[]>) => {
      state.cards = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { toggleLike, setCards, setError } = likesSlice.actions;
export default likesSlice.reducer;