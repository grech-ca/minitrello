import { FC, MouseEventHandler, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';

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
  const overlayRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const close = () => navigate('/');

  useEscape(close);

  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = ({ target }) => {
    if (target === overlayRef.current) close();
  };

  return createPortal(
    <ModalOverlay
      onClick={handleOverlayClick}
      ref={overlayRef}
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
