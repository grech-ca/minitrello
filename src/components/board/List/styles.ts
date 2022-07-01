import styled from '@emotion/styled';
import { MdAdd, MdDelete } from 'react-icons/md';

export const ListWrapper = styled.div(({ theme }) => ({
  borderRadius: theme.rounding.sm,
  background: '#ebecf0',
  width: 272,
}));

export const ListHeader = styled.div({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 8px',
  paddingRight: 4,
  height: 40,
  cursor: 'pointer',
});

export const ListTitle = styled.h2({
  padding: '4px 8px',
  flex: 1,
  fontSize: 14,
  fontWeight: 700,
  margin: 0,
});

export const ListTitleForm = styled.form({
  flex: 1,
  position: 'relative',
  left: -2,
});

export const ListTitleInput = styled.input({
  padding: '4px 8px',
  fontSize: 14,
  fontWeight: 700,
  width: '100%',
});

export const ListFooter = styled.div({
  display: 'flex',
  alignItems: 'center',
  padding: '2px 8px 8px 8px',
  height: 38,
});

export const AddCardButton = styled.button(({ theme }) => ({
  padding: '4px 8px',
  display: 'flex',
  alignItems: 'center',
  height: 28,
  flex: 1,
  cursor: 'pointer',
  border: 'none',
  borderRadius: theme.rounding.sm,
  fontSize: 14,
  gap: 2,

  ':hover': {
    background: '#091e4214',
  },

  ':active': {
    background: '#091e4224',
  },
}));

export const AddCardButtonText = styled.span({});

export const AddCardButtonIcon = styled(MdAdd)({
  fontSize: 18,
});

export const DeleteButton = styled.button(({ theme }) => ({
  borderRadius: theme.rounding.sm,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  height: 32,
  width: 32,
  padding: 6,
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
