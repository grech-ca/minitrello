import { FC } from 'react';

import { Link } from 'react-router-dom';

import { LogoButton } from './styles';

export const Logo: FC = () => {
  return (
    <LogoButton as={Link} to="/">
      Minitrello
    </LogoButton>
  );
};
