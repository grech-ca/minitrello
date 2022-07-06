import { minmax } from 'utils';

import { FC, ReactNode, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useClickAway, useWindowSize } from 'react-use';
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

  const [popupSize, setPopupSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const closePopup = () => onClose?.();

  useClickAway(popupRef, ({ target }) => {
    if (target === anchorElement) return;
    closePopup();
  });

  const { width = 0, height = 0, x = 0, y = 0 } = anchorElement?.getBoundingClientRect() ?? {};
  const winSize = useWindowSize();

  const safeX = minmax(10, x, winSize.width - popupSize.width - 10);
  const safeY = minmax(10, y + height + 10, winSize.height - popupSize.height - 10);

  useEffect(() => {
    if (isOpen && anchorElement && popupRef.current) {
      const { width, height } = popupRef.current.getBoundingClientRect();
      setPopupSize({ width, height });
    }
  }, [isOpen, anchorElement]);

  return createPortal(
    <AnimatePresence>
      {isOpen && anchorElement ? (
        <PopupWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeOut', duration: 0.1 }}
          ref={popupRef}
          $anchor={{ width, height, x: safeX, y: safeY }}
        >
          {children}
        </PopupWrapper>
      ) : null}
    </AnimatePresence>,
    rootElement,
  );
};
