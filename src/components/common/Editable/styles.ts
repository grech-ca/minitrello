import styled from '@emotion/styled';
import ReactTextarea from 'react-textarea-autosize';

export const EditableWrapper = styled(ReactTextarea)(({ theme }) => ({
  resize: 'none',
  background: 'transparent',
  border: 'none',
  padding: '4px 8px',
  flex: 1,
  borderRadius: theme.rounding.sm,
  transition: 'box-shadow .2s ease',

  ':focus, :focus-within': {
    background: theme.colors.white,
    boxShadow: `0 0 0 2px ${theme.colors.primary}`,
    outline: 'none',
  },
}));
