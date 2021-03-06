import {
  forwardRef,
  KeyboardEventHandler,
  useRef,
  useImperativeHandle,
  ChangeEventHandler,
  FocusEventHandler,
} from 'react';

import { TextareaAutosizeProps } from 'react-textarea-autosize';
import { useClickAway } from 'react-use';
import { omitBy } from 'lodash';

import { EditableWrapper } from './styles';

export type ClickAwayAction = 'submit' | 'cancel';

export interface EditableProps extends Omit<TextareaAutosizeProps, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  onCancel?: () => void;
  selectOnFocus?: boolean;
  submitOnEnter?: boolean;
  clickAwayAction?: ClickAwayAction;
}

export const Editable = forwardRef<HTMLTextAreaElement | null, EditableProps>(
  (
    {
      onSubmit,
      onCancel,
      value,
      onChange,
      selectOnFocus = true,
      submitOnEnter = true,
      clickAwayAction,
      onFocus,
      ...props
    },
    ref,
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(document.createElement('textarea'));

    useImperativeHandle(ref, () => textareaRef.current);

    const stopEditing = () => textareaRef.current?.blur();
    const cancel = () => onCancel?.();
    const submit = () => {
      value.length ? onSubmit?.() : cancel();
    };

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = ({ target: { value } }) => onChange(value);
    const handleFocus: FocusEventHandler<HTMLTextAreaElement> = e => {
      const { target } = e;
      if (selectOnFocus) target.setSelectionRange(0, target.value.length);
      onFocus?.(e);
    };

    const onKeyDown: KeyboardEventHandler = e => {
      if (!textareaRef.current) return;
      switch (e.key) {
        case 'Enter':
          if (submitOnEnter) {
            e.preventDefault();
            stopEditing();
            submit();
          }
          break;
        case 'Escape': {
          cancel();
          stopEditing();
          e.stopPropagation();
          break;
        }
      }
    };

    useClickAway(textareaRef, () => {
      switch (clickAwayAction) {
        case 'submit':
          return submit();
        case 'cancel':
          return cancel();
      }
    });

    const sanitizedProps = omitBy<typeof props>(props, (_, key) => key.startsWith('$'));

    return (
      <EditableWrapper
        ref={textareaRef}
        onKeyDown={onKeyDown}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        {...sanitizedProps}
      />
    );
  },
);

Editable.displayName = 'Editable';
