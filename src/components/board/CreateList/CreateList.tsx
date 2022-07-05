import { FC, useRef, useState, FormEventHandler } from 'react';

import { useClickAway } from 'react-use';
import { AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';

import { Button, CloseButton, Editable } from 'components/common';

import { useEscape } from 'hooks';

import { createListAction } from 'store/slices';

import { Wrapper, AddIcon, Form, Actions, Placeholder } from './styles';

export const CreateList: FC = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resetTitle = () => setTitle('');
  const createList = () => {
    if (!title) return;
    dispatch(createListAction(title));
    resetTitle();
    textareaRef.current?.focus();
  };

  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    resetTitle();
  };

  useEscape(close);
  useClickAway(formRef, close);

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    createList();
  };

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
            <Editable
              ref={textareaRef}
              autoFocus
              placeholder="Enter list title..."
              value={title}
              onChange={setTitle}
              onCancel={close}
              onSubmit={createList}
              minRows={1}
            />
            <Actions>
              <Button type="submit" variant="primary">
                Add list
              </Button>
              <CloseButton onClick={close} />
            </Actions>
          </Form>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};
