import { FC, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useClickAway } from 'react-use';
import { useNavigate } from 'react-router-dom';

import { useEscape } from 'hooks';

import { ModalName } from 'store/slices';

import { ModalOverlay, ModalWrapper } from './styles';

import { rootElement } from 'index';

export interface ModalProps {
  name?: ModalName;
  children?: null | ReactNode | ReactNode[];
}

export const Modal: FC<ModalProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const close = () => navigate('/');

  useEscape(close);
  useClickAway(wrapperRef, close);

  return createPortal(
    <ModalOverlay
      transition={{ transition: 'easeOut', duration: 0.15 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ModalWrapper ref={wrapperRef}>{children}</ModalWrapper>
    </ModalOverlay>,
    rootElement,
  );
};
