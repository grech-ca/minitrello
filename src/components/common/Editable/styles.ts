import styled from '@emotion/styled';
import ReactTextarea from 'react-textarea-autosize';

export const EditableWrapper = styled(ReactTextarea)(({ theme }) => ({
  display: 'block',
  resize: 'none',
  background: 'transparent',
  border: '2px solid transparent',
  padding: '4px 8px',
  flex: 1,
  borderRadius: theme.rounding.sm,
  transition: 'border .2s ease',

  ':focus, :focus-within': {
    background: theme.colors.white,
    borderColor: theme.colors.primary,
    outline: 'none',
  },
}));
