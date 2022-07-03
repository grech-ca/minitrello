import styled from '@emotion/styled';
import { MdLeaderboard } from 'react-icons/md';

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

export const LogoIcon = styled(MdLeaderboard)(({ theme }) => ({
  transform: 'rotate(180deg)',
  padding: 2,
  borderRadius: theme.rounding.sm,
  background: theme.colors.white,
  color: theme.colors.primary,
  marginRight: 5,
  fontSize: 18,
}));
