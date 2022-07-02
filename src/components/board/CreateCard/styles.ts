import styled from '@emotion/styled';
import ReactTextarea from 'react-textarea-autosize';
import { MdAdd } from 'react-icons/md';

export const CreateCardWrapper = styled.form({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

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

export const Actions = styled.div({
  display: 'flex',
  gap: 4,
  height: 32,
});
