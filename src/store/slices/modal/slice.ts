import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalName } from './types';

export interface ModalState {
  active: ModalName | null;
}

const initialState: ModalState = {
  active: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, action: PayloadAction<ModalName>) => {
      state.active = action.payload;
    },
    close: state => {
      state.active = null;
    },
  },
});

export const { open: openAction, close: closeAction } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
