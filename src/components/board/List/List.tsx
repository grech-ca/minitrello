import { ChangeEventHandler, FC, FormEventHandler, useState, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { useKey, useClickAway } from 'react-use';

import { deleteListAction, updateListAction } from 'store/slices';
import { List } from 'store/slices/board/types';

import {
  ListWrapper,
  ListHeader,
  ListTitle,
  ListTitleForm,
  ListFooter,
  AddCardButton,
  AddCardButtonText,
  AddCardButtonIcon,
  DeleteButton,
  DeleteIcon,
  ListTitleInput,
} from './styles';

export interface ListProps {
  list: List;
}

const ListComponent: FC<ListProps> = ({ list }) => {
  const dispatch = useDispatch();

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
        {!isEdit && <ListTitle onClick={handleClick}>{title}</ListTitle>}
        {isEdit && (
          <ListTitleForm onSubmit={handleSubmit}>
            <ListTitleInput ref={inputRef} autoFocus value={title} onChange={handleChange} onBlur={stopEditing} />
          </ListTitleForm>
        )}
        <DeleteButton onClick={handleDelete}>
          <DeleteIcon />
        </DeleteButton>
      </ListHeader>
      <ListFooter>
        <AddCardButton>
          <AddCardButtonIcon />
          <AddCardButtonText>Add a card</AddCardButtonText>
        </AddCardButton>
      </ListFooter>
    </ListWrapper>
  );
};

export { ListComponent as List };
