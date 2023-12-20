import { FC, useMemo, Fragment } from 'react';

import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Draggable, DraggableStateSnapshot, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { pick, values, filter } from 'lodash';
import { MdSubject, MdOutlineCheckBox } from 'react-icons/md';
import { clsx } from 'clsx';

import { Card, Label } from 'store/slices/board/types';
import { RootState } from 'store';

import { O } from 'ts-toolbelt';
import { ShortLabels } from './ShortLabels';

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
        <Link
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={clsx(
            'border-b-2 border-b-slate-900/10 rounded-lg resize-none w-full outline-none text-sm py-2 px-3 !cursor-pointer min-h-[2rem]',
            'flex flex-col justify-center gap-2 transition-[0.05s] text-black no-underline bg-slate-50 hover:bg-gray-100',
            { 'px-4 after:inline-block after:h-0.5 after:w-full after:bg-gray-300': isDivider },
          )}
          ref={provided.innerRef}
          role="button"
          to={`/c/${card.id}`}
          state={{ backgroundLocation: location }}
          style={getStyle(provided.draggableProps.style, snapshot)}
        >
          {labelsList.length > 0 && (
            <div className="flex">
              <ShortLabels colors={labelsList.map(({ color }) => color)} />
            </div>
          )}
          {!isDivider && card.title}
          {(hasDescription || hasChecklists) && (
            <div className="flex items-center gap-4 flex-wrap text-sm text-gray-500">
              {hasDescription && <MdSubject />}
              {hasChecklists && (
                <Fragment>
                  <MdOutlineCheckBox />
                  {completed} / {total}
                </Fragment>
              )}
            </div>
          )}
        </Link>
      )}
    </Draggable>
  );
};

export { CardComponent as Card };
