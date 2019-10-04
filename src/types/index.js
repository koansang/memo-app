import { arrayOf, string, shape, object } from 'prop-types';

export const memoType = shape({
  _id: string,
  updatedAt: string,
  createdAt: string,
  title: string,
  content: string,
});

export const labelType = shape({
  _id: string,
  updatedAt: string,
  createdAt: string,
  title: string,
  memos: arrayOf(memoType),
});

export const labelListType = arrayOf(labelType);

export const routerType = object;
