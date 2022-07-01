import { FC } from 'react';

import { CreateList } from 'components/board/CreateList';

import { StyledBoard } from './styles';

export const Board: FC = () => {
  return (
    <StyledBoard>
      <CreateList />
    </StyledBoard>
  );
};
