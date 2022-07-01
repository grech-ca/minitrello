import { FC } from 'react';

import { useSelector } from 'react-redux';

import { CreateList, List } from 'components/board';

import { RootState } from 'store';

import { StyledBoard } from './styles';

export const Board: FC = () => {
  const lists = useSelector((state: RootState) => state.board.lists);

  return (
    <StyledBoard>
      {lists.map(list => (
        <List key={list.id} list={list} />
      ))}
      <CreateList />
    </StyledBoard>
  );
};
