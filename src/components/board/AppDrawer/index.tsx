import { Fragment } from 'react';
import { createPortal } from 'react-dom';

import { Dialog, Transition } from '@headlessui/react';
import { MdMoreHoriz as DrawerIcon, MdClose as CloseIcon } from 'react-icons/md';
import { useToggle } from 'react-use';
import { useDispatch } from 'react-redux';
import { clsx } from 'clsx';

import { resetBoardAction } from 'store/slices';

export const AppDrawer = () => {
  const [isOpened, toggleOpened] = useToggle(false);

  const dispatch = useDispatch();

  const resetBoard = () => dispatch(resetBoardAction());

  return (
    <Fragment>
      <button
        className={clsx(
          'aspect-square h-8 flex items-center justify-center rounded hover:bg-gray-900/10 active:bg-gray-900/20 transition-colors',
          'text-white text-xl',
        )}
        onClick={toggleOpened}
      >
        <DrawerIcon />
      </button>
      {createPortal(
        <Transition show={isOpened}>
          <Dialog onClose={toggleOpened} className="relative z-50">
            <Transition.Child
              as={Fragment}
              enter="transition-opacity duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Backdrop
                as="button"
                className="fixed inset-0 bg-gray-900/60 backdrop-blur cursor-pointer transition-colors"
                onClick={toggleOpened}
              />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition-all duration-200"
              enterFrom="translate-x-full opacity-0 blur-2xl"
              enterTo="translate-x-0 opacity-100 blur-0"
              leave="transition-all duration-150"
              leaveFrom="translate-x-0 opacity-100 blur-0"
              leaveTo="translate-x-full opacity-0 blur-2xl"
            >
              <Dialog.Panel className="fixed inset-y-0 right-0 p-6 rounded-l-3xl bg-white w-4/5 max-w-xs grid gap-y-6 content-start">
                <div className="flex justify-between items-center">
                  <div className="text-xl">Menu</div>
                  <button
                    onClick={toggleOpened}
                    className="rounded hover:bg-gray-900/10 active:bg-gray-900/20 transition-colors flex items-center justify-center aspect-square h-8 text-xl text-gray-900"
                  >
                    <CloseIcon />
                  </button>
                </div>
                <div className="grid gap-y-3 content-start">
                  <button
                    onClick={resetBoard}
                    className="rounded p-2 bg-red-100 hover:bg-red-200 active:bg-red-300 text-red-800 transition-colors"
                  >
                    Reset board
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>,
        document.body,
      )}
    </Fragment>
  );
};
