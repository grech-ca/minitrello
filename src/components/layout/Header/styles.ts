import styled from '@emotion/styled';

export const StyledHeader = styled.header(({ theme }) => ({
  height: 44,
  padding: '6px 4px',
  display: 'flex',
  background: theme.colors.primary,
}));

export const Logo = styled.div(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: 5,
  fontWeight: 900,
  color: theme.colors.white,
  fontSize: 20,
}));
