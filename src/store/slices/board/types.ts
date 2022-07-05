export interface List {
  id: string;
  title: string;
  cardIds: string[];
}

export interface Card {
  id: string;
  listId: string;
  title: string;
  description?: string;
}

export type CreateCard = Omit<Card, 'id'>;
