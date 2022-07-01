import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store';
import { ModalName, openAction, closeAction } from 'store/slices/modal';

interface UseModalResult {
  active: ModalName | null;
  open: (modalName: ModalName) => void;
  close: () => void;
}

interface UseModal {
  (): UseModalResult;
}

export const useModal: UseModal = () => {
  const dispatch = useDispatch();

  const active = useSelector((state: RootState) => state.modal.active);
  const open = (modalName: ModalName) => dispatch(openAction(modalName));
  const close = () => dispatch(closeAction());

  return { active, open, close };
};
