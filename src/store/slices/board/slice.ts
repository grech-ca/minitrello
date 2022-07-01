import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Column, CreateColumn, Card, CreateCard } from './types';

export interface BoardState {
  columns: Column[];
  cards: Card[];
}

const initialState: BoardState = {
  columns: [],
  cards: [],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    createColumn: (state, action: PayloadAction<CreateColumn>) => {
      state.columns = [...state.columns, action.payload];
    },
    createCard: (state, action: PayloadAction<CreateCard>) => {
      state.cards = [...state.cards, action.payload];
    },
  },
});

export const boardReducer = boardSlice.reducer;

export const { createCard: createCardAction, createColumn: createColumnAction } = boardSlice.actions;
