import { ChangeEventHandler, FC, KeyboardEventHandler, useState, useRef, FormEventHandler } from 'react';

import { useDispatch } from 'react-redux';
import { useClickAway, useKey } from 'react-use';
import { MdAdd } from 'react-icons/md';
import ReactTextarea from 'react-textarea-autosize';

import { Button, CloseButton } from 'components/common';

import { createCardAction } from 'store/slices';

import { Textarea, Actions } from './styles';

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
      <form className="w-full flex flex-col gap-2" ref={formRef} onSubmit={handleSubmit}>
        <ReactTextarea
          className="border-b-2 border-b-slate-900/10 rounded-lg resize-none w-full outline-none text-sm py-2 px-3 bg-white"
          onChange={handleChange}
          autoFocus
          value={title}
          onKeyDown={handleKeyDown}
          placeholder="Enter a title for this card..."
          minRows={3}
        />
        <div className="flex gap-x-1 h-8">
          <Button type="submit" variant="primary">
            Add a card
          </Button>
          <CloseButton onClick={close} />
        </div>
      </form>
    );
  }

  return (
    <Button onClick={open} icon={MdAdd} fullWidth>
      Add a card
    </Button>
  );
};
