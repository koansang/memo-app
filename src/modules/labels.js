import { createAction, handleActions } from 'redux-actions';

import { async } from 'q';
import * as api from '../api';

const ADD_LABEL = 'label/ADD_LABEL';
const ADD_LABEL_SUCCESS = 'label/ADD_LABEL_SUCCESS';
const ADD_LABEL_LOADING = 'label/ADD_LABEL_LOADING';
const ADD_LABEL_FAILURE = 'label/ADD_LABEL_FAILURE';

const LIST_LABEL = 'label/LIST_LABEL';
const LIST_LABEL_SUCCESS = 'label/LIST_LABEL_SUCCESS';
const LIST_LABEL_LOADING = 'label/LIST_LABEL_LOADING';
const LIST_LABEL_FAILURE = 'label/LIST_LABEL_FAILURE';

const DELETE_LABEL = 'label/DELETE_LABEL';
const DELETE_LABEL_SUCCESS = 'label/DELETE_LABEL_SUCCESS';
const DELETE_LABEL_LOADING = 'label/DELETE_LABEL_LOADING';
const DELETE_LABEL_FAILURE = 'label/DELETE_LABEL_FAILURE';

const EDIT_LABEL = 'label/EDIT_LABEL';
const EDIT_LABEL_SUCCESS = 'label/EDIT_LABEL_SUCCESS';
const EDIT_LABEL_LOADING = 'label/EDIT_LABEL_LOADING';
const EDIT_LABEL_FAILURE = 'label/EDIT_LABEL_FAILURE';

const ATTACH_LABEL = 'label/ATTACH_LABEL';
const ATTACH_LABEL_SUCCESS = 'label/ATTACH_LABEL_SUCCESS';
const ATTACH_LABEL_LOADING = 'label/ATTACH_LABEL_LOADING';
const ATTACH_LABEL_FAILURE = 'label/ATTACH_LABEL_FAILURE';

const DETACH_LABEL = 'label/DETACH_LABEL';
const DETACH_LABEL_SUCCESS = 'label/DETACH_LABEL_SUCCESS';
const DETACH_LABEL_LOADING = 'label/DETACH_LABEL_LOADING';
const DETACH_LABEL_FAILURE = 'label/DETACH_LABEL_FAILURE';

const defaultState = {
  labels: [],
  loading: false,
  error: false,
  message: null,
};

async function fetchListLabel() {
  const [labels, memos] = await Promise.all([api.listLabel(), api.listMemos()]);
  return [
    {
      _id: 'all',
      title: '전체 메모',
      memos,
    },
    ...labels,
  ];
}

export const listLabel = createAction(LIST_LABEL, fetchListLabel);

export const addLabel = createAction(ADD_LABEL, async label => {
  const result = await api.addLabel(label);

  return result;
});

export const deleteLabel = createAction(DELETE_LABEL, async labelId => {
  const response = await api.deleteLabel(labelId);

  return response === 200;
});

export const editLabel = createAction(EDIT_LABEL, async (labelId, title) => {
  const result = await api.editLabel(labelId, title);

  return result;
});

export const attachLabel = createAction(ATTACH_LABEL, async (labelId, memoIds) => {
  await api.attachLabel(labelId, memoIds);
  const response = await fetchListLabel();

  return response;
});

export const detachLabel = createAction(DETACH_LABEL, async (labelId, memoIds) => {
  await api.detachLabel(labelId, memoIds);
  const response = await fetchListLabel();

  return response;
});

export default handleActions(
  {
    [LIST_LABEL_SUCCESS]: (state, action) => {
      return {
        ...state,
        labels: [...action.payload],
      };
    },
    [ADD_LABEL_SUCCESS]: (state, action) => ({
      ...state,
      labels: [...state.labels, action.payload],
    }),
    [DELETE_LABEL_SUCCESS]: state => ({
      ...state,
    }),
    [EDIT_LABEL_SUCCESS]: (state, action) => {
      const { labels } = state;
      const label = action.payload;
      const updatedLabels = labels.map(l => {
        return label['_id'] === l['_id'] ? label : l;
      });

      return {
        ...state,
        labels: [...updatedLabels],
      };
    },
    [ATTACH_LABEL_SUCCESS]: (state, action) => ({
      ...state,
      labels: [...action.payload],
    }),
    [DETACH_LABEL_SUCCESS]: (state, action) => ({
      ...state,
      labels: [...action.payload],
    }),
  },
  defaultState,
);
