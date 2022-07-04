import { FC } from 'react';

import { useLocation } from 'react-router-dom';
import { Draggable, DraggableStateSnapshot, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

import { Card } from 'store/slices/board/types';

import { CardWrapper } from './styles';

export interface CardProps {
  card: Card;
  index: number;
}

const getStyle = (style: DraggingStyle | NotDraggingStyle | undefined, snapshot: DraggableStateSnapshot) => {
  if (snapshot.isDragging && !snapshot.isDropAnimating) {
    return {
      ...style,
      transform: `${style?.transform || ''} rotate(0.01turn)`,
    };
  }

  return {
    ...style,
    transition: 'transform 1ms ease, opacity 1ms ease',
  };
};

export const CardComponent: FC<CardProps> = ({ card, index }) => {
  const location = useLocation();

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <CardWrapper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          to={`/c/${card.id}`}
          state={{ backgroundLocation: location }}
          style={getStyle(provided.draggableProps.style, snapshot)}
        >
          {card.title}
        </CardWrapper>
      )}
    </Draggable>
  );
};

export { CardComponent as Card };
