import { FC } from 'react';

import { useLocation } from 'react-router-dom';

import { Card } from 'store/slices/board/types';

import { CardWrapper } from './styles';

export interface CardProps {
  card: Card;
}

export const CardComponent: FC<CardProps> = ({ card }) => {
  const location = useLocation();

  return (
    <CardWrapper role="button" to={`/c/${card.id}`} state={{ backgroundLocation: location }}>
      {card.title}
    </CardWrapper>
  );
};

export { CardComponent as Card };
