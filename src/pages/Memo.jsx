import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { matchPath } from 'react-router-dom';
import { Row, Divider, Modal } from 'antd';

import { routerType } from '../types';
import { listLabel, attachLabel } from '../modules/labels';
import { addMemo, editMemo, deleteMemo } from '../modules/memos';

import Header from '../components/Memo/Header';
import Content from '../components/Memo/Content';
import { getMemo } from '../modules/selectors';
import styles from './Memo.module.scss';

const { error, confirm } = Modal;

function Memo(props) {
  const { match, history } = props;
  const isNew = match.params.memo === 'new';
  const dispatch = useDispatch();
  const [isEditable, setEditable] = useState(isNew);
  const handleEditable = useCallback(editable => {
    setEditable(editable);
  }, []);

  const labelsPath = matchPath(history.location.pathname, {
    path: '/labels/:label',
    exact: false,
  });

  const labelId = labelsPath && labelsPath.params.label ? labelsPath.params.label : '';

  const memo = useSelector(state => getMemo(state, labelId, match.params.memo));

  const handleSubmit = useCallback(async () => {
    const title = document.getElementById('MEMO-TITLE').innerHTML;
    const content = document.getElementById('MEMO-CONTENT').innerHTML;

    if (!title || !content) {
      error({
        title: '제목과 내용을 입력해 주세요',
      });
      return;
    }

    if (isNew) {
      await dispatch(addMemo({ title, content }, labelId));
    } else {
      await dispatch(editMemo(memo['_id'], { title, content }));
    }

    await dispatch(listLabel());
    history.replace(`/labels/${labelId}`);
  }, [dispatch, history, isNew, labelId, memo]);

  const handleDelete = useCallback(async () => {
    await dispatch(deleteMemo(memo['_id']));
    await dispatch(listLabel());

    history.replace(`/labels/${labelId}`);
  });

  return (
    <div className={styles.container}>
      <Row>
        <Header
          editable={isEditable}
          memo={memo}
          history={history}
          onEditable={handleEditable}
          onDelete={handleDelete}
        />
      </Row>
      <Divider />
      <Row>
        <Content editable={isEditable} memo={memo} onEditable={handleEditable} onSubmit={handleSubmit} />
      </Row>
    </div>
  );
}

Memo.propTypes = {
  match: routerType.isRequired,
  history: routerType.isRequired,
};

export default Memo;
