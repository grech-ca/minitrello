import { ChangeEventHandler, FC, FormEventHandler, useState, useRef, KeyboardEventHandler } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useKey, useClickAway } from 'react-use';

import { Card, CreateCard } from 'components/board';

import { RootState } from 'store';
import { deleteListAction, updateListAction } from 'store/slices';
import { List } from 'store/slices/board/types';

import {
  ListWrapper,
  ListHeader,
  ListTitle,
  ListTitleForm,
  ListBody,
  DeleteButton,
  DeleteIcon,
  ListTitleTextarea,
  ListFooter,
} from './styles';

export interface ListProps {
  list: List;
}

const ListComponent: FC<ListProps> = ({ list }) => {
  const dispatch = useDispatch();

  const cards = useSelector((state: RootState) => state.board.cards.filter(({ id }) => list.cardIds.includes(id)));

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState(list.title);
  const [isEdit, setIsEdit] = useState(false);

  const startEditing = () => setIsEdit(true);
  const stopEditing = () => setIsEdit(false);

  const renameList = () => {
    dispatch(updateListAction({ id: list.id, title }));
    stopEditing();
  };

  const handleDelete = () => dispatch(deleteListAction(list.id));
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = ({ target: { value } }) => setTitle(value);
  const handleClick = () => !isEdit && startEditing();
  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = e => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    renameList();
  };

  useKey('Escape', renameList);
  useClickAway(textareaRef, renameList);

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    renameList();
    stopEditing();
  };

  return (
    <ListWrapper>
      <ListHeader>
        {!isEdit ? (
          <ListTitle onClick={handleClick}>{title}</ListTitle>
        ) : (
          <ListTitleForm onSubmit={handleSubmit}>
            <ListTitleTextarea
              ref={textareaRef}
              onKeyDown={handleKeyDown}
              autoFocus
              value={title}
              onChange={handleChange}
              onBlur={stopEditing}
            />
          </ListTitleForm>
        )}
        <DeleteButton onClick={handleDelete}>
          <DeleteIcon />
        </DeleteButton>
      </ListHeader>
      {cards.length > 0 && (
        <ListBody>
          {cards.map(card => (
            <Card key={card.id} card={card} />
          ))}
        </ListBody>
      )}
      <ListFooter>
        <CreateCard listId={list.id} />
      </ListFooter>
    </ListWrapper>
  );
};

export { ListComponent as List };
