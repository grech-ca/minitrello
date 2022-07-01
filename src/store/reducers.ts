import { combineReducers } from 'redux';

import { modalReducer, boardReducer } from './slices';

export const rootReducer = combineReducers({
  modal: modalReducer,
  board: boardReducer,
});
