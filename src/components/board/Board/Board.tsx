import { FC } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { compact } from 'lodash';

import { CreateList, List } from 'components/board';

import { RootState } from 'store';
import { moveCardAction, moveListAction } from 'store/slices';

import { StyledBoard } from './styles';

export const Board: FC = () => {
  const dispatch = useDispatch();

  const lists = useSelector((state: RootState) =>
    compact(state.board.listsOrder.map(listId => state.board.lists[listId])),
  );

  const onDragEnd = ({ draggableId, destination, source, type }: DropResult) => {
    if (!destination) return;

    if (type === 'card') {
      return dispatch(
        moveCardAction({
          cardId: draggableId,
          listId: destination.droppableId,
          sourceListId: source.droppableId,
          index: destination.index,
        }),
      );
    }

    if (type === 'list') {
      return dispatch(
        moveListAction({
          listId: draggableId,
          index: destination.index,
        }),
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="list">
        {({ droppableProps, placeholder, innerRef }) => (
          <StyledBoard ref={innerRef} {...droppableProps}>
            {lists.map((list, index) => (
              <List key={list.id} list={list} index={index} />
            ))}
            {placeholder}
            <CreateList />
          </StyledBoard>
        )}
      </Droppable>
    </DragDropContext>
  );
};
