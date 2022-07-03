import { FC } from 'react';

import { useLocation } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

import { Card } from 'store/slices/board/types';

import { CardWrapper } from './styles';

export interface CardProps {
  card: Card;
  index: number;
}

export const CardComponent: FC<CardProps> = ({ card, index }) => {
  const location = useLocation();

  return (
    <Draggable draggableId={card.id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <CardWrapper
          {...draggableProps}
          {...dragHandleProps}
          ref={innerRef}
          role="button"
          to={`/c/${card.id}`}
          state={{ backgroundLocation: location }}
        >
          {card.title}
        </CardWrapper>
      )}
    </Draggable>
  );
};

export { CardComponent as Card };
