import { FC } from 'react';

import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Modal } from 'components/common';

import { RootState } from 'store';

export const CardModal: FC = () => {
  const { cardId } = useParams<{ cardId: string }>();

  const card = useSelector((state: RootState) => state.board.cards.find(({ id }) => id === cardId));

  if (!card) return <Navigate to="/" />;

  return <Modal>{card?.title}</Modal>;
};
