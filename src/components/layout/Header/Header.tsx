import { FC } from 'react';

import { useDispatch } from 'react-redux';
import { MdDeleteOutline } from 'react-icons/md';

import { Fill } from 'components/common';

import { resetBoardAction } from 'store/slices';

import { StyledHeader, Logo, LogoIcon, ResetButton } from './styles';

export const Header: FC = () => {
  const dispatch = useDispatch();

  const resetBoard = () => dispatch(resetBoardAction());

  return (
    <StyledHeader>
      <Logo>
        <LogoIcon />
        Minitrello
      </Logo>
      <Fill />
      <ResetButton variant="secondary" onClick={resetBoard} icon={MdDeleteOutline}>
        Reset
      </ResetButton>
    </StyledHeader>
  );
};
