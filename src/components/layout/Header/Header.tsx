import { FC } from 'react';

import { Fill } from 'components/common';
import { AppDrawer } from 'components/board/AppDrawer';

import { StyledHeader, Logo, LogoIcon } from './styles';

export const Header: FC = () => {
  return (
    <StyledHeader>
      <Logo>
        <LogoIcon />
        Minitrello
      </Logo>
      <Fill />
      <AppDrawer />
    </StyledHeader>
  );
};
