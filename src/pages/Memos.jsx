import React from 'react';
import { useSelector } from 'react-redux';
import { Divider } from 'antd';
import { matchPath } from 'react-router-dom';

import { routerType } from '../types';
import { getLabel, getMemoList } from '../modules/selectors';
import Header from '../components/Memos/Header';
import MemoList from '../components/Memos/MemoList';

import styles from './Memos.module.scss';

function Memos(props) {
  const { match, history } = props;
  const labelId = match.params.label;

  const memoPath = matchPath(history.location.pathname, {
    path: '/labels/:label/memos/:memo',
    exact: false,
  });

  const memoPathId = memoPath && memoPath.params ? memoPath.params.memo : null;

  const { label, memos } = useSelector(state => ({
    label: getLabel(state, labelId),
    memos: getMemoList(state, labelId),
  }));

  return (
    <div className={styles.container}>
      <Header label={label} history={history} />
      <Divider style={{ margin: '12px 0' }} />
      <MemoList memos={memos} labelId={label['_id']} memoPathId={memoPathId} />
    </div>
  );
}

Memos.propTypes = {
  match: routerType.isRequired,
  history: routerType.isRequired,
};

export default Memos;
