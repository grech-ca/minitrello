import { MdClose } from 'react-icons/md';
import styled from '@emotion/styled';

export const CloseIcon = styled(MdClose)({
  height: '80%',
  width: '80%',
});

export const CloseButtonWrapper = styled.button({
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
