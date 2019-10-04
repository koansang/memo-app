import { combineReducers } from 'redux';

import labels from './labels';
import memo from './memos';

export default combineReducers({
  labels,
  memo,
});
