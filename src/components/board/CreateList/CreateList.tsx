import { FC, useRef, useState, FormEventHandler, ChangeEventHandler } from 'react';

import { useKey, useClickAway } from 'react-use';
import { AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';

import { Button, CloseButton } from 'components/common';

import { createListAction } from 'store/slices';

import { Wrapper, AddIcon, Form, Actions, Input, Placeholder } from './styles';

export const CreateList: FC = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const open = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.setSelectionRange(0, title.length), 0);
  };
  const close = () => setIsOpen(false);

  useKey('Escape', close);
  useClickAway(formRef, close);

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    if (!title) return;
    dispatch(createListAction(title));
    setTitle('');
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => setTitle(value);

  return (
    <Wrapper role="button">
      <Placeholder onClick={open}>
        <AddIcon /> Add a list
      </Placeholder>
      <AnimatePresence>
        {isOpen && (
          <Form
            initial={{ opacity: 0, height: 40 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 40 }}
            transition={{ duration: 0.1 }}
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <Input
              ref={inputRef}
              autoFocus
              type="text"
              placeholder="Enter list title..."
              value={title}
              onChange={handleChange}
            />
            <Actions>
              <Button type="submit">Add list</Button>
              <CloseButton onClick={close} />
            </Actions>
          </Form>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};
