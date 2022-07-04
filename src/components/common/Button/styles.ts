import styled from '@emotion/styled';

export const ButtonWrapper = styled.button(({ theme }) => ({
  borderRadius: theme.rounding.sm,
  border: 'none',
  color: theme.colors.white,
  background: theme.colors.primary,
  padding: '4px 12px',
  cursor: 'pointer',
  height: 32,
}));
