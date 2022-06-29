import { Button, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import color from 'color';

export const LogoButton = styled(Button)({
  padding: '5px 10px',
  height: 'auto',
  fontWeight: 900,
  fontSize: 18,
  background: theme.colors.transparent,
  color: theme.colors.white,

  '&:hover': {
    background: color(theme.colors.white).alpha(0.2).toString(),
  },
});
