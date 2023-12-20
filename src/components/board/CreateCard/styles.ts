import styled from '@emotion/styled';
import ReactTextarea from 'react-textarea-autosize';

export const Textarea = styled(ReactTextarea)(({ theme }) => ({
  boxShadow: '0 1px 0 #091e4240',
  borderRadius: theme.rounding.sm,
  resize: 'none',
  width: '100%',
  border: 'none',
  outline: 'none',
  fontSize: 14,
  padding: '6px 8px 2px',
  background: theme.colors.white,
}));

export const Actions = styled.div({
  display: 'flex',
  gap: 4,
  height: 32,
});
