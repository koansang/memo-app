import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, Typography, Checkbox } from 'antd';
import dayjs from 'dayjs';

import { memoType } from '../../types';
import Config from './Config';

const { Text } = Typography;

function MemoList(props) {
  const { memos, labelId, memoPathId } = props;
  const [selectMemos, changeSelectMemos] = useState([]);
  const handleMemos = useCallback(
    id => {
      const hasMemo = selectMemos.includes(id);
      const newList = hasMemo ? selectMemos.filter(memo => memo !== id) : [...selectMemos, id];

      changeSelectMemos(newList);
    },
    [selectMemos],
  );

  const initSelectMemos = useCallback(() => {
    changeSelectMemos([]);
  }, []);

  return (
    <List theme="light">
      {memos.length === 0 && <Text level={4}>등록 된 메모가 없습니다.</Text>}
      {memos.map(memo => (
        <List.Item key={memo['_id']} style={{ backgroundColor: memoPathId ? '#e6f7ff' : null }}>
          <Checkbox checked={selectMemos.includes(memo['_id'])} onChange={() => handleMemos(memo['_id'])} />
          <Link
            to={`/labels/${labelId}/memos/${memo['_id']}`}
            style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            <List.Item.Meta
              title={`${memo.title}(${dayjs(memo.updatedAt).format('YYYY.MM.DD')})`}
              description={memo.content}
              style={{ marginLeft: '20px' }}
            />
          </Link>
        </List.Item>
      ))}
      {selectMemos.length > 0 && <Config memos={selectMemos} labelId={labelId} initSelectMemos={initSelectMemos} />}
    </List>
  );
}

MemoList.propTypes = {
  memos: PropTypes.arrayOf(memoType).isRequired,
  labelId: PropTypes.string,
  memoPathId: PropTypes.string,
};

MemoList.defaultProps = {
  labelId: '',
  memoPathId: null,
};

export default MemoList;
