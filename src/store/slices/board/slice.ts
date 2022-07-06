import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import shortid from 'shortid';
import { find, set, unset, without, merge, fromPairs } from 'lodash';

import { List, Card, CreateCard, Checklist, ChecklistItem, Label, UpdateLabel } from './types';

import { O } from 'ts-toolbelt';

export interface BoardState {
  listsOrder: string[];
  lists: Record<string, List>;
  cards: Record<string, Card>;
  checklists: Record<string, Checklist>;
  labels: Record<string, Label>;
}

export const COLORS = [
  '#61bd4f',
  '#f2d600',
  '#ff9f1a',
  '#eb5a46',
  '#c377e0',
  '#0079bf',
  '#00c2e0',
  '#51e898',
  '#ff78cb',
  '#344563',
  '#b3bac5',
];

const initialState: BoardState = {
  listsOrder: [],
  lists: {},
  cards: {},
  checklists: {},
  labels: fromPairs(COLORS.map(color => [color, { id: color, color, name: '' }])),
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
    moveList: (state, action: PayloadAction<{ listId: string; index: number }>) => {
      const { listId, index } = action.payload;
      const newOrder = without(state.listsOrder, listId);
      newOrder.splice(index, 0, listId);
      state.listsOrder = newOrder;
    },

    createCard: (state, action: PayloadAction<CreateCard>) => {
      const data = action.payload;

      const newCard: Card = {
        id: shortid.generate(),
        checklistIds: [],
        labelIds: [],
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

      set(state.lists, [targetList.id, 'cardIds'], without(targetList.cardIds, deleteId));
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

      set(state.lists, [sourceListId, 'cardIds'], without(targetSourceList.cardIds, cardId));

      const newCardIds = targetList.cardIds;
      newCardIds.splice(index, 0, cardId);
      set(state.lists, `${listId}.cardIds`, newCardIds);

      set(state.cards, [cardId, 'listId'], listId);
    },

    createChecklist: (state, action: PayloadAction<{ cardId: string; title: string }>) => {
      const { cardId, title } = action.payload;

      const targetCard = state.cards[cardId];
      if (!targetCard) return;

      const newChecklist: Checklist = {
        id: shortid.generate(),
        cardId,
        title,
        items: {},
        itemIds: [],
      };

      set(state.checklists, newChecklist.id, newChecklist);
      set(state.cards, [cardId, 'checklistIds'], [...targetCard.checklistIds, newChecklist.id]);
    },
    deleteChecklist: (state, action: PayloadAction<string>) => {
      const deleteId = action.payload;

      const targetChecklist = state.checklists[deleteId];
      if (!targetChecklist) return;

      const targetCard = state.cards[targetChecklist.cardId];
      if (!targetCard) return;

      unset(state.checklists, deleteId);
      set(state.cards, [targetCard.id, 'checklistIds'], without(targetCard.checklistIds, deleteId));
    },

    createChecklistItem: (state, action: PayloadAction<{ checklistId: string; title: string }>) => {
      const { checklistId, title } = action.payload;

      const targetChecklist = state.checklists[checklistId];
      if (!targetChecklist) return;

      const newItem: ChecklistItem = {
        id: shortid.generate(),
        checklistId,
        title,
        completed: false,
      };

      set(state.checklists, [checklistId, 'items', newItem.id], newItem);
      set(state.checklists, [checklistId, 'itemIds'], [...targetChecklist.itemIds, newItem.id]);
    },
    updateChecklistItem: (state, action: PayloadAction<O.Required<Partial<ChecklistItem>, 'id' | 'checklistId'>>) => {
      const { id, checklistId, ...data } = action.payload;

      const targetChecklist = state.checklists[checklistId];
      if (!targetChecklist) return;

      const targetItem = targetChecklist.items[id];
      if (!targetItem) return;

      set(state.checklists, [checklistId, 'items', id], merge(targetItem, data));
    },
    deleteChecklistItem: (state, action: PayloadAction<ChecklistItem>) => {
      const { id, checklistId } = action.payload;

      const targetChecklist = state.checklists[checklistId];
      if (!targetChecklist) return;

      const targetItem = targetChecklist.items[id];
      if (!targetItem) return;

      unset(state.checklists, [checklistId, 'items', id]);
      set(state.checklists, [checklistId, 'itemIds'], without(targetChecklist.itemIds, id));
    },

    addLabel: (state, action: PayloadAction<{ cardId: string; id: string }>) => {
      const { id, cardId } = action.payload;

      const targetLabel = state.labels[id];
      if (!targetLabel) return;

      const targetCard = state.cards[cardId];
      if (!targetCard) return;

      set(state.cards, [cardId, 'labelIds'], [id, ...targetCard.labelIds]);
    },
    removeLabel: (state, action: PayloadAction<{ id: string; cardId: string }>) => {
      const { id, cardId } = action.payload;

      const targetLabel = state.labels[id];
      if (!targetLabel) return;

      const targetCard = state.cards[cardId];
      if (!targetCard) return;

      set(state.cards, [cardId, 'labelIds'], without(targetCard.labelIds, id));
    },
    createLabel: (state, action: PayloadAction<{ name: string; color: string | null }>) => {
      const data = action.payload;
      const newLabel: Label = {
        id: shortid.generate(),
        ...data,
      };

      set(state.labels, newLabel.id, newLabel);
    },
    updateLabel: (state, action: PayloadAction<UpdateLabel>) => {
      const { id, ...data } = action.payload;

      const targetLabel = state.labels[id];
      if (!targetLabel) return;

      set(state.labels, id, merge(targetLabel, data));
    },
    deleteLabel: (state, action: PayloadAction<string>) => {
      const deleteId = action.payload;

      const targetLabel = state.labels[deleteId];
      if (!targetLabel) return;

      Object.values(state.cards).forEach(card => {
        if (!card.labelIds.includes(deleteId)) return;
        set(state.cards, [card.id, 'labelIds'], without(card.labelIds, deleteId));
      });

      unset(state.labels, deleteId);
    },
  },
});

export const boardReducer = boardSlice.reducer;

export const {
  createCard: createCardAction,
  deleteCard: deleteCardAction,
  moveCard: moveCardAction,
  updateCard: updateCardAction,

  createList: createListAction,
  deleteList: deleteListAction,
  updateList: updateListAction,
  moveList: moveListAction,

  createChecklist: createChecklistAction,
  deleteChecklist: deleteChecklistAction,

  createChecklistItem: createChecklistItemAction,
  updateChecklistItem: updateChecklistItemAction,
  deleteChecklistItem: deleteChecklistItemAction,

  addLabel: addLabelAction,
  removeLabel: removeLabelAction,
  createLabel: createLabelAction,
  updateLabel: updateLabelAction,
  deleteLabel: deleteLabelAction,
} = boardSlice.actions;
