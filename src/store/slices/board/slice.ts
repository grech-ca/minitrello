import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import shortid from 'shortid';
import { find, reject, set, without } from 'lodash';

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
        cardIds: [],
      };
      state.lists = [...state.lists, newList];
    },
    deleteList: (state, action: PayloadAction<string>) => {
      const listToDelete = find(state.lists, { id: action.payload });
      if (!listToDelete) return;

      state.lists = reject(state.lists, { id: action.payload });
      state.cards = reject(state.cards, ({ id }) => listToDelete.cardIds.includes(id));
    },
    updateList: (state, action: PayloadAction<Omit<List, 'cardIds'>>) => {
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
      state.lists = state.lists.map(list => {
        if (list.id !== action.payload.listId) return list;
        return set(list, 'cardIds', [...list.cardIds, newCard.id]);
      });
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      state.cards = reject(state.cards, { id: action.payload });
      state.lists = state.lists.map(list => {
        if (!list.cardIds.includes(action.payload)) return list;
        return set(list, 'cardIds', without(list.cardIds, action.payload));
      });
    },
    updateCard: (state, action: PayloadAction<Card>) => {
      const { id, ...data } = action.payload;
      state.cards = state.cards.map(card => {
        if (card.id !== id) return card;
        return { ...card, ...data };
      });
    },
    moveCard: (state, action: PayloadAction<{ cardId: string; listId: string; index: number }>) => {
      const { cardId, listId, index } = action.payload;

      state.lists = state.lists.map(list => {
        if (!list.cardIds.includes(cardId)) return list;
        return { ...list, cardIds: without(list.cardIds, cardId) };
      });

      state.lists = state.lists.map(list => {
        if (list.id !== listId) return list;
        const newCardIds = list.cardIds;
        newCardIds.splice(index, 0, cardId);
        return { ...list, cardIds: newCardIds };
      });
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
  moveCard: moveCardAction,
  updateCard: updateCardAction,
} = boardSlice.actions;
