import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { ModalCloseWrapper } from './styles';

export const ModalClose: FC = () => {
  const navigate = useNavigate();

  const close = () => navigate('/');

  return <ModalCloseWrapper onClick={close} />;
};
