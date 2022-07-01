import { FC } from 'react';

import { StyledHeader, Logo } from './styles';

export const Header: FC = () => {
  return (
    <StyledHeader>
      <Logo>Minitrello</Logo>
    </StyledHeader>
  );
};
