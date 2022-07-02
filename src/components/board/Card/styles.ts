import styled from '@emotion/styled';

export const CardWrapper = styled.div(({ theme }) => ({
  boxShadow: '0 1px 0 #091e4240',
  borderRadius: theme.rounding.sm,
  resize: 'none',
  width: '100%',
  border: 'none',
  outline: 'none',
  fontSize: 14,
  padding: '6px 8px',
  background: theme.colors.white,
  cursor: 'pointer',
  height: 32,
  display: 'flex',
  alignItems: 'center',
  transition: '.05s ease',

  ':hover': {
    background: '#f5f5fa',
  },
}));
