import { FC, FocusEventHandler, useState, useRef } from 'react';

import { useClickAway } from 'react-use';
import Markdown from 'markdown-to-jsx';

import { Button, EditableProps, Fill } from 'components/common';

import { DescriptionActions, DescriptionWrapper, DescriptionTextarea, MarkdownWrapper } from './styles';

export type EditableDescriptionProps = Omit<EditableProps, 'submitOnEnter' | 'placeholder'>;

export const EditableDescription: FC<EditableProps> = ({ onFocus, onCancel, onSubmit, value, ...props }) => {
  const descriptionRef = useRef<HTMLDivElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const cancel = () => {
    setIsFocused(false);
    onCancel?.();
  };
  const submit = () => {
    setIsFocused(false);
    onSubmit?.();
  };
  const startEditing = () => setIsFocused(true);

  const handleFocus: FocusEventHandler<HTMLTextAreaElement> = e => {
    setIsFocused(true);
    onFocus?.(e);
  };

  useClickAway(descriptionRef, cancel);

  return (
    <DescriptionWrapper ref={descriptionRef}>
      {value && !isFocused ? (
        <MarkdownWrapper onClick={startEditing}>
          <Markdown>{value}</Markdown>
        </MarkdownWrapper>
      ) : (
        <div>
          <DescriptionTextarea
            {...props}
            value={value}
            placeholder="Add a more detailed description..."
            onFocus={handleFocus}
            onCancel={cancel}
            submitOnEnter={false}
            cancelOnClickAway={false}
            minRows={isFocused ? 6 : 2}
            autoFocus
            $isFocused={isFocused}
          />
        </div>
      )}
      {isFocused && (
        <DescriptionActions>
          <Button onClick={submit}>Save</Button>
          <Button onClick={cancel}>Cancel</Button>
          <Fill />
          <Button>Formatting help</Button>
        </DescriptionActions>
      )}
    </DescriptionWrapper>
  );
};
