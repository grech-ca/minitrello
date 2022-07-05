import { FC, useState, useRef } from 'react';

import { useClickAway } from 'react-use';
import { useDispatch } from 'react-redux';

import { Editable, Button } from 'components/common';

import { createChecklistItemAction } from 'store/slices/board';

import { CreateItemWrapper, Actions, TextareaWrapper, AddButton } from './styles';

export interface CreateChecklistItemProps {
  checklistId: string;
}

export const CreateChecklistItem: FC<CreateChecklistItemProps> = ({ checklistId }) => {
  const dispatch = useDispatch();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const resetTitle = () => setTitle('');
  const cancel = () => {
    resetTitle();
    close();
  };
  const submit = () => {
    if (!title) return;
    dispatch(createChecklistItemAction({ checklistId, title }));
    resetTitle();
    textareaRef.current?.focus();
  };

  useClickAway(wrapperRef, cancel);

  if (!isOpen) {
    return (
      <AddButton onClick={open} variant="secondary">
        Add an item
      </AddButton>
    );
  }

  return (
    <CreateItemWrapper ref={wrapperRef}>
      <TextareaWrapper>
        <Editable
          ref={textareaRef}
          value={title}
          onChange={setTitle}
          onCancel={cancel}
          onSubmit={submit}
          placeholder="Add an item"
          minRows={2}
          submitOnEnter
          autoFocus
        />
      </TextareaWrapper>
      <Actions>
        <Button variant="primary" onClick={submit}>
          Add
        </Button>
        <Button onClick={cancel}>Cancel</Button>
      </Actions>
    </CreateItemWrapper>
  );
};
