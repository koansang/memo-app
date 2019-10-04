import { createSelector } from 'reselect';

const getCurrentLabel = (state, labelId) => {
  const { labels } = state.labels;

  return labels.find(label => label['_id'] === labelId);
};

const getCurrentMemo = (state, labelId, memoId) => {
  const label = getCurrentLabel(state, labelId);

  return label && label.memos ? label.memos.find(memo => memo['_id'] === memoId) : {};
};

export const getLabel = createSelector(
  [getCurrentLabel],
  label => label || {},
);

export const getMemoList = createSelector(
  [getCurrentLabel],
  label => (label ? label.memos : []),
);

export const getMemo = createSelector(
  [getCurrentMemo],
  memo => memo || {},
);
