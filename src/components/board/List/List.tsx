import { FC, useState, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Droppable, Draggable, DraggingStyle, NotDraggingStyle, DraggableStateSnapshot } from 'react-beautiful-dnd';
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
  ListHandler,
} from './styles';

export interface ListProps {
  list: List;
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

const ListComponent: FC<ListProps> = ({ list, index }) => {
  const dispatch = useDispatch();

  const [handlerVisible, setHandlerVisible] = useState(false);

  const titleRef = useRef<HTMLTextAreaElement>(null);

  const cards = useSelector((state: RootState) => {
    return compact(list.cardIds.map(cardId => find(state.board.cards, { id: cardId })));
  });

  const [title, setTitle] = useState(list.title);

  const hideHandler = () => setHandlerVisible(false);
  const showHandler = () => setHandlerVisible(true);
  const startEditing = () => {
    titleRef.current?.focus();
    hideHandler();
  };
  const renameList = () => dispatch(updateListAction({ id: list.id, title }));
  const resetTitle = () => setTitle(list.title);

  const handleDelete = () => dispatch(deleteListAction(list.id));

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided, snapshot) => (
        <ListWrapper
          {...provided.draggableProps}
          ref={provided.innerRef}
          style={getStyle(provided.draggableProps.style, snapshot)}
        >
          <ListHeader {...provided.dragHandleProps}>
            {handlerVisible && <ListHandler onClick={startEditing} />}
            <ListTitle
              onBlur={showHandler}
              ref={titleRef}
              value={title}
              onChange={setTitle}
              onCancel={resetTitle}
              onSubmit={renameList}
            />
            <DeleteButton onClick={handleDelete}>
              <DeleteIcon />
            </DeleteButton>
          </ListHeader>
          <ListScrollContainer>
            <Droppable droppableId={list.id} type="card">
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
      )}
    </Draggable>
  );
};

export { ListComponent as List };
