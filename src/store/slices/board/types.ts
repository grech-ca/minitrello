export interface List {
  id: string;
  title: string;
  cardIds: string[];
}

export interface Card {
  id: string;
  title: string;
}

export interface CreateCard extends Omit<Card, 'id'> {
  listId: string;
}
