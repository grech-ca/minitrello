import { FC } from 'react';

import { Card } from 'store/slices/board/types';

import { CardWrapper } from './styles';

export interface CardProps {
  card: Card;
}

export const CardComponent: FC<CardProps> = ({ card }) => {
  return <CardWrapper role="button">{card.title}</CardWrapper>;
};

export { CardComponent as Card };
