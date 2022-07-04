import { FC, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import { find, compact } from 'lodash';

import { Card, CreateCard } from 'components/board';

import { RootState } from 'store';
import { deleteListAction, updateListAction } from 'store/slices';
import { List } from 'store/slices/board/types';

import {
  ListWrapper,
  ListHeader,
  ListBody,
  DeleteButton,
  DeleteIcon,
  ListFooter,
  ListTitle,
  ListScrollContainer,
} from './styles';

export interface ListProps {
  list: List;
}

const ListComponent: FC<ListProps> = ({ list }) => {
  const dispatch = useDispatch();

  const cards = useSelector((state: RootState) => {
    return compact(list.cardIds.map(cardId => find(state.board.cards, { id: cardId })));
  });

  const [title, setTitle] = useState(list.title);

  const renameList = () => dispatch(updateListAction({ id: list.id, title }));
  const resetTitle = () => setTitle(list.title);

  const handleDelete = () => dispatch(deleteListAction(list.id));

  return (
    <ListWrapper>
      <ListHeader>
        <ListTitle value={title} onChange={setTitle} onCancel={resetTitle} onSubmit={renameList} selectOnFocus />
        <DeleteButton onClick={handleDelete}>
          <DeleteIcon />
        </DeleteButton>
      </ListHeader>
      <ListScrollContainer>
        <Droppable droppableId={list.id}>
          {({ droppableProps, placeholder, innerRef }) => (
            <ListBody {...droppableProps} ref={innerRef}>
              {cards.map((card, index) => (
                <Card index={index} key={card.id} card={card} />
              ))}
              {placeholder}
            </ListBody>
          )}
        </Droppable>
      </ListScrollContainer>
      <ListFooter>
        <CreateCard listId={list.id} />
      </ListFooter>
    </ListWrapper>
  );
};

export { ListComponent as List };
