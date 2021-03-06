import { ChangeEventHandler, FC, KeyboardEventHandler, useState, useRef, FormEventHandler } from 'react';

import { useDispatch } from 'react-redux';
import { useClickAway, useKey } from 'react-use';
import { MdAdd } from 'react-icons/md';

import { Button, CloseButton } from 'components/common';

import { createCardAction } from 'store/slices';

import { CreateCardWrapper, Textarea, Actions } from './styles';

export interface CardFormProps {
  listId: string;
}

export const CreateCard: FC<CardFormProps> = ({ listId }) => {
  const [title, setTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const dispatch = useDispatch();

  const createCard = () => {
    if (!title) return;
    dispatch(createCardAction({ listId, title }));
    setTitle('');
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = ({ target: { value } }) => {
    setTitle(value.replace(/\r?\n|\r/, ''));
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    createCard();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = ({ key }) => {
    if (key !== 'Enter') return;
    createCard();
  };

  useKey('Escape', close);
  useClickAway(formRef, title ? createCard : close);

  if (isOpen) {
    return (
      <CreateCardWrapper ref={formRef} onSubmit={handleSubmit}>
        <Textarea
          onChange={handleChange}
          autoFocus
          value={title}
          onKeyDown={handleKeyDown}
          placeholder="Enter a title for this card..."
          minRows={3}
        />
        <Actions>
          <Button type="submit" variant="primary">
            Add a card
          </Button>
          <CloseButton onClick={close} />
        </Actions>
      </CreateCardWrapper>
    );
  }

  return (
    <Button onClick={open} icon={MdAdd} fullWidth>
      Add a card
    </Button>
  );
};
