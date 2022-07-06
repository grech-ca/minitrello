import { AnyAction, combineReducers } from 'redux';
import localForage from 'localforage';

import { modalReducer, boardReducer } from './slices';

const reducers = {
  modal: modalReducer,
  board: boardReducer,
};

export const appReducer = combineReducers(reducers);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === 'board/resetBoard') {
    void localForage.removeItem('persist:root');
    state = {};
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return appReducer(state, action);
};
