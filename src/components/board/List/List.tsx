import { ChangeEventHandler, FC, FormEventHandler, useState, useRef } from 'react';

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
  ListTitleInput,
} from './styles';

export interface ListProps {
  list: List;
}

const ListComponent: FC<ListProps> = ({ list }) => {
  const dispatch = useDispatch();

  const cards = useSelector((state: RootState) => state.board.cards.filter(({ listId }) => listId === list.id));

  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(list.title);
  const [isEdit, setIsEdit] = useState(false);

  const startEditing = () => setIsEdit(true);
  const stopEditing = () => setIsEdit(false);

  const handleDelete = () => dispatch(deleteListAction(list.id));
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => setTitle(value);
  const handleClick = () => !isEdit && startEditing();

  const renameList = () => dispatch(updateListAction({ id: list.id, title }));

  useKey('Escape', renameList);
  useClickAway(inputRef, renameList);

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
            <ListTitleInput ref={inputRef} autoFocus value={title} onChange={handleChange} onBlur={stopEditing} />
          </ListTitleForm>
        )}
        <DeleteButton onClick={handleDelete}>
          <DeleteIcon />
        </DeleteButton>
      </ListHeader>
      <ListBody>
        {cards.map(card => (
          <Card key={card.id} card={card} />
        ))}
        <CreateCard listId={list.id} />
      </ListBody>
    </ListWrapper>
  );
};

export { ListComponent as List };
