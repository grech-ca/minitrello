import {
  FC,
  forwardRef,
  KeyboardEventHandler,
  useRef,
  useImperativeHandle,
  ChangeEventHandler,
  FocusEventHandler,
} from 'react';

import { TextareaAutosizeProps } from 'react-textarea-autosize';
import { useClickAway } from 'react-use';

import { EditableWrapper } from './styles';

export interface EditableProps extends Omit<TextareaAutosizeProps, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  onCancel?: () => void;
  selectOnFocus?: boolean;
}

export const Editable: FC<EditableProps> = forwardRef(
  ({ onSubmit, onCancel, value, onChange, selectOnFocus, onFocus, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

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
          e.preventDefault();
          stopEditing();
          submit();
          break;
        case 'Escape': {
          cancel();
          stopEditing();
          e.stopPropagation();
          break;
        }
      }
    };

    useClickAway(textareaRef, submit);

    return (
      <EditableWrapper
        ref={textareaRef}
        onKeyDown={onKeyDown}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        {...props}
      />
    );
  },
);

Editable.displayName = 'Editable';
