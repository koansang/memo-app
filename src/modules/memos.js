import { createAction, handleActions } from 'redux-actions';

import * as api from '../api';

const ADD_MEMO = 'memo/ADD_MEMO';
const ADD_MEMO_SUCCESS = 'memo/ADD_MEMO_SUCCESS';
const ADD_MEMO_LOADING = 'memo/ADD_MEMO_LOADING';
const ADD_MEMO_FAILURE = 'memo/ADD_MEMO_FAILURE';

const EDIT_MEMO = 'memo/EDIT_MEMO';
const EDIT_MEMO_SUCCESS = 'memo/EDIT_MEMO_SUCCESS';
const EDIT_MEMO_LOADING = 'memo/EDIT_MEMO_LOADING';
const EDIT_MEMO_FAILURE = 'memo/EDIT_MEMO_FAILURE';

const DELETE_MEMO = 'memo/DELETE_MEMO';
const DELETE_MEMO_SUCCESS = 'memo/DELETE_MEMO_SUCCESS';
const DELETE_MEMO_LOADING = 'memo/DELETE_MEMO_LOADING';
const DELETE_MEMO_FAILURE = 'memo/DELETE_MEMO_FAILURE';

const DELETE_MEMOS = 'memo/DELETE_MEMOS';
const DELETE_MEMOS_SUCCESS = 'memo/DELETE_MEMOS_SUCCESS';
const DELETE_MEMOS_LOADING = 'memo/DELETE_MEMOS_LOADING';
const DELETE_MEMOS_FAILURE = 'memo/DELETE_MEMOS_FAILURE';

export const addMemo = createAction(ADD_MEMO, async (memo, labelId) => {
  const result = await api.addMemo(memo);
  const attachResult = await api.attachLabel(labelId, [result['_id']]);

  return attachResult;
});

export const editMemo = createAction(EDIT_MEMO, async (memoId, memo) => {
  const result = await api.editMemo(memoId, memo);

  return result;
});

export const deleteMemo = createAction(DELETE_MEMO, async memoId => {
  const result = await api.deleteMemo(memoId);

  return result;
});

export const deleteMemos = createAction(DELETE_MEMOS, async memoIds => {
  const requests = memoIds.map(id => api.deleteMemo(id));
  const result = await Promise.all(requests);

  return result;
});

const initialMemo = {};

export default handleActions(
  {
    [ADD_MEMO_SUCCESS]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [EDIT_MEMO_SUCCESS]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DELETE_MEMO_SUCCESS]: state => ({
      ...state,
    }),
    [DELETE_MEMOS_SUCCESS]: state => ({
      ...state,
    }),
  },
  initialMemo,
);
