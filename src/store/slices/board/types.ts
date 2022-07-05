import { O } from 'ts-toolbelt';

export interface List {
  id: string;
  title: string;
  cardIds: string[];
}

export interface Card {
  id: string;
  listId: string;
  title: string;
  checklistIds: string[];
  description?: string;
}

export interface CreateCard {
  listId: string;
  title: string;
}

export interface Checklist {
  id: string;
  cardId: string;
  title: string;
  items: Record<string, ChecklistItem>;
  itemIds: string[];
}

export interface ChecklistItem {
  id: string;
  checklistId: string;
  title: string;
  completed: boolean;
}

export type UpdateChecklistItem = O.Required<Partial<ChecklistItem>, 'id' | 'checklistId'>;
