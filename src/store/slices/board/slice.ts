import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import shortid from 'shortid';

import { List, Card, CreateCard } from './types';

export interface BoardState {
  lists: List[];
  cards: Card[];
}

const initialState: BoardState = {
  lists: [],
  cards: [],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    createList: (state, action: PayloadAction<string>) => {
      const newList: List = {
        id: shortid.generate(),
        title: action.payload,
      };
      state.lists = [...state.lists, newList];
    },
    deleteList: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter(({ id }) => id !== action.payload);
      state.cards = state.cards.filter(({ listId }) => listId !== action.payload);
    },
    updateList: (state, action: PayloadAction<List>) => {
      const { id, ...data } = action.payload;
      state.lists = state.lists.map(list => {
        if (list.id !== id) return list;
        return { ...list, ...data };
      });
    },
    createCard: (state, action: PayloadAction<CreateCard>) => {
      const newCard: Card = {
        id: shortid.generate(),
        ...action.payload,
      };
      state.cards = [...state.cards, newCard];
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(({ id }) => id !== action.payload);
    },
  },
});

export const boardReducer = boardSlice.reducer;

export const {
  createCard: createCardAction,
  deleteCard: deleteCardAction,
  createList: createListAction,
  deleteList: deleteListAction,
  updateList: updateListAction,
} = boardSlice.actions;
