import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import shortid from 'shortid';
import { find, reject, set, unset, without, merge } from 'lodash';

import { List, Card, CreateCard } from './types';

export interface BoardState {
  listsOrder: string[];
  lists: Record<string, List>;
  cards: Record<string, Card>;
}

const initialState: BoardState = {
  listsOrder: [],
  lists: {},
  cards: {},
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

      set(state.lists, newList.id, newList);
      state.listsOrder = [...state.listsOrder, newList.id];
    },
    deleteList: (state, action: PayloadAction<string>) => {
      const deleteId = action.payload;

      const listToDelete = find(state.lists, { id: action.payload });
      if (!listToDelete) return;

      unset(state.lists, deleteId);

      listToDelete.cardIds.forEach(cardId => unset(state.cards, cardId));
      state.listsOrder = without(state.listsOrder, deleteId);
    },
    updateList: (state, action: PayloadAction<Omit<List, 'cardIds'>>) => {
      const { id, ...data } = action.payload;

      const targetList = state.lists[id];
      if (!targetList) return;

      state.lists[id] = merge(targetList, data);
    },
    createCard: (state, action: PayloadAction<CreateCard>) => {
      const data = action.payload;

      const newCard: Card = {
        id: shortid.generate(),
        ...data,
      };
      state.cards[newCard.id] = newCard;

      const targetList = state.lists[data.listId];
      if (!targetList) return;

      state.lists[data.listId] = set(targetList, 'cardIds', [...targetList.cardIds, newCard.id]);
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      const deleteId = action.payload;

      const targetCard = state.cards[deleteId];
      if (!targetCard) return;

      unset(state.cards, deleteId);

      const targetList = state.lists[targetCard.listId];
      if (!targetList) return;

      set(state.lists, `${targetList.id}.cardIds`, without(targetList.cardIds, deleteId));
    },
    updateCard: (state, action: PayloadAction<Partial<Card> & Pick<Card, 'id'>>) => {
      const { id, ...data } = action.payload;

      const targetCard = state.cards[id];
      if (!targetCard) return;

      set(state.cards, id, merge(targetCard, data));
    },
    moveCard: (
      state,
      action: PayloadAction<{ cardId: string; listId: string; sourceListId: string; index: number }>,
    ) => {
      const { cardId, listId, sourceListId, index } = action.payload;

      const targetCard = state.cards[cardId];
      if (!targetCard) return;

      const targetList = state.lists[listId];
      if (!targetList) return;

      const targetSourceList = state.lists[sourceListId];
      if (!targetSourceList) return;

      set(state.lists, `${sourceListId}.cardIds`, without(targetSourceList.cardIds, cardId));

      const newCardIds = targetList.cardIds;
      newCardIds.splice(index, 0, cardId);
      set(state.lists, `${listId}.cardIds`, newCardIds);

      set(state.cards, `${cardId}.listId`, listId);
    },
    moveList: (state, action: PayloadAction<{ listId: string; index: number }>) => {
      const { listId, index } = action.payload;
      const newOrder = without(state.listsOrder, listId);
      newOrder.splice(index, 0, listId);
      state.listsOrder = newOrder;
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
  moveList: moveListAction,
} = boardSlice.actions;
