import { FC } from 'react';

import { Logo } from 'components/common';

import { StyledHeader } from './styles';

export const Header: FC = () => {
  return (
    <StyledHeader>
      <Logo />
    </StyledHeader>
  );
};
