import { FC } from 'react';

import { StyledHeader, Logo, LogoIcon } from './styles';

export const Header: FC = () => {
  return (
    <StyledHeader>
      <Logo>
        <LogoIcon />
        Minitrello
      </Logo>
    </StyledHeader>
  );
};
