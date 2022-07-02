import styled from '@emotion/styled';
import { MdDelete } from 'react-icons/md';
import ReactTextarea from 'react-textarea-autosize';

export const ListWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.rounding.sm,
  background: '#ebecf0',
  width: 272,
  minWidth: 272,
  maxHeight: '100%',
  overflow: 'hidden',
}));

export const ListHeader = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  padding: 8,
  paddingRight: 4,
  paddingBottom: 0,
  minHeight: 40,
  cursor: 'pointer',
});

export const ListTitle = styled.h2({
  display: 'block',
  padding: 8,
  flex: 1,
  fontSize: 14,
  fontWeight: 700,
  margin: 0,
  wordWrap: 'break-word',
  wordBreak: 'break-all',
  minHeight: 32,
});

export const ListTitleForm = styled.form({
  flex: 1,
});

export const ListTitleTextarea = styled(ReactTextarea)({
  padding: '4px 8px',
  fontSize: 14,
  fontWeight: 700,
  width: '100%',
  resize: 'none',
});

export const DeleteButton = styled.button(({ theme }) => ({
  borderRadius: theme.rounding.sm,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  height: 32,
  width: 32,
  padding: '0 6px',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 20,
  color: '#999',
  transition: '.2s ease',

  ':hover': {
    background: '#ddd',
  },
}));

export const DeleteIcon = styled(MdDelete)({});

export const ListBody = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  flex: 1,
  padding: '0 10px',
  paddingTop: 8,
  overflowY: 'auto',
});

export const ListFooter = styled.div({
  display: 'flex',
  justifyContent: 'stretch',
  alignItems: 'center',
  gap: 4,
  padding: '8px 10px',
});
