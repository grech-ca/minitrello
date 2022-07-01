import styled from '@emotion/styled';
import { MdAdd, MdClose } from 'react-icons/md';
import { motion } from 'framer-motion';

export const Wrapper = styled.div(({ theme }) => ({
  height: 40,
  width: 272,
  background: '#ffffff3D',
  borderRadius: theme.rounding.sm,
  transition: '.2s ease',
  position: 'relative',

  ':hover': {
    background: '#ffffff52',
  },
}));

export const Input = styled.input(({ theme }) => ({
  height: 36,
  padding: '8px 12px',
  outline: 'none',
  border: '2px solid',
  borderColor: theme.colors.primary,
  borderRadius: theme.rounding.sm,
}));

export const Form = styled(motion.form)(({ theme }) => ({
  width: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  borderRadius: theme.rounding.sm,
  padding: 4,
  background: '#ebecf0',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}));

export const Actions = styled.div({
  display: 'flex',
  gap: 4,
});

export const CloseIcon = styled(MdClose)({
  height: '80%',
  width: '80%',
});

export const CloseButton = styled.button({
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  height: 32,
  width: 32,
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 20,
  opacity: 0.6,
  transition: '.2s ease',
  padding: 0,

  ':hover': {
    opacity: 0.9,
  },
});

export const Placeholder = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: 14,
  color: '#fff',
  fontWeight: 'bold',
  padding: '8px 10px',
  height: '100%',
  width: '100%',
  cursor: 'pointer',
});

export const AddButton = styled.button(({ theme }) => ({
  borderRadius: theme.rounding.sm,
  border: 'none',
  color: theme.colors.white,
  background: theme.colors.primary,
  padding: '4px 12px',
  cursor: 'pointer',
}));

export const AddIcon = styled(MdAdd)({
  fontSize: 20,
  marginRight: 2,
});
