import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import dayjs from 'dayjs';

import { memoType } from '../../types';
import styles from './Content.module.scss';

function Content(props) {
  const { memo, editable, onEditable, onSubmit } = props;
  const handleEditable = useCallback(() => {
    onEditable(true);
  }, [onEditable]);

  return (
    <div>
      <p className={styles.date}>
        {memo.updatedAt ? `최종 수정일: ${dayjs(memo.updatedAt).format('YYYY.MM.DD')}` : ''}
      </p>
      <p
        id="MEMO-CONTENT"
        className={styles.editable}
        contentEditable={editable}
        onClick={handleEditable}
        dangerouslySetInnerHTML={{ __html: memo.content }}
      />
      {!editable && (
        <Button onClick={handleEditable} style={{ float: 'right' }}>
          수정하기
        </Button>
      )}
      {editable && (
        <Button type="primary" onClick={onSubmit} style={{ float: 'right' }}>
          등록하기
        </Button>
      )}
    </div>
  );
}

Content.propTypes = {
  memo: memoType.isRequired,
  editable: PropTypes.bool,
  onEditable: PropTypes.func,
};

Content.defaultProps = {
  editable: false,
  onEditable: () => null,
};

export default Content;
