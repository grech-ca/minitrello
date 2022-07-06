import { FC, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useClickAway } from 'react-use';
import { AnimatePresence } from 'framer-motion';

import { PopupWrapper } from './styles';

import { rootElement } from 'index';

export interface PopupProps {
  anchorElement: HTMLElement | null;
  isOpen: boolean;
  children: ReactNode | ReactNode[];
  onClose?: () => void;
}

export const Popup: FC<PopupProps> = ({ children, anchorElement, isOpen, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  const close = () => onClose?.();

  useClickAway(popupRef, ({ target }) => {
    if (target === anchorElement) return;
    close();
  });

  const { width = 0, height = 0, x = 0, y = 0 } = anchorElement?.getBoundingClientRect() ?? {};

  return createPortal(
    <AnimatePresence>
      {isOpen && anchorElement ? (
        <PopupWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeOut', duration: 0.1 }}
          ref={popupRef}
          $anchor={{ width, height, x, y }}
        >
          {children}
        </PopupWrapper>
      ) : null}
    </AnimatePresence>,
    rootElement,
  );
};
