import { FC, useMemo, Fragment } from 'react';

import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Draggable, DraggableStateSnapshot, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { pick, values, filter } from 'lodash';
import { MdSubject, MdOutlineCheckBox } from 'react-icons/md';

import { Card, Label } from 'store/slices/board/types';
import { RootState } from 'store';

import { CardWrapper, CardHeader, ShortLabels, ShortLabel, CardFooter } from './styles';

import { O } from 'ts-toolbelt';

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

  const labels = useSelector((state: RootState) => pick(state.board.labels, card.labelIds));
  const labelsList = filter(values(labels)) as O.Compulsory<Label, 'color'>[];

  const checklists = useSelector((state: RootState) => values(pick(state.board.checklists, card.checklistIds)));
  const { completed, total } = checklists.reduce(
    (acc, checklist) => {
      const completed = values(checklist.items).filter(({ completed }) => completed).length;
      const total = checklist.itemIds.length;

      return {
        total: acc.total + total,
        completed: acc.completed + completed,
      };
    },
    { completed: 0, total: 0 },
  );

  const isDivider = useMemo(() => /^-{3,}$/.test(card.title), [card.title]);

  const hasDescription = !!card.description;
  const hasChecklists = card.checklistIds.length > 0 && total + completed > 0;

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <CardWrapper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          $isDivider={isDivider}
          ref={provided.innerRef}
          role="button"
          to={`/c/${card.id}`}
          state={{ backgroundLocation: location }}
          style={getStyle(provided.draggableProps.style, snapshot)}
        >
          {labelsList.length > 0 && (
            <CardHeader>
              <ShortLabels>
                {labelsList.map(({ id, color }) => (
                  <ShortLabel key={id} $color={color} />
                ))}
              </ShortLabels>
            </CardHeader>
          )}
          {!isDivider && card.title}
          {(hasDescription || hasChecklists) && (
            <CardFooter>
              {hasDescription && <MdSubject />}
              {hasChecklists && (
                <Fragment>
                  <MdOutlineCheckBox />
                  {completed} / {total}
                </Fragment>
              )}
            </CardFooter>
          )}
        </CardWrapper>
      )}
    </Draggable>
  );
};

export { CardComponent as Card };
