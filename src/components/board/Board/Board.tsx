import { FC } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { CreateList, List } from 'components/board';

import { RootState } from 'store';
import { moveCardAction } from 'store/slices';

import { StyledBoard } from './styles';

export const Board: FC = () => {
  const dispatch = useDispatch();

  const lists = useSelector((state: RootState) => state.board.lists);

  const onDragEnd = ({ draggableId, destination }: DropResult) => {
    if (!destination) return;

    dispatch(
      moveCardAction({
        cardId: draggableId,
        listId: destination.droppableId,
        index: destination.index,
      }),
    );
  };

  return (
    <StyledBoard>
      <DragDropContext onDragEnd={onDragEnd}>
        {lists.map(list => (
          <List key={list.id} list={list} />
        ))}
      </DragDropContext>
      <CreateList />
    </StyledBoard>
  );
};
