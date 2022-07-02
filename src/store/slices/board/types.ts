export interface List {
  id: string;
  title: string;
}

export interface Card {
  id: string;
  listId: string;
  title: string;
}

export type CreateCard = Omit<Card, 'id'>;
