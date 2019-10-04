import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal, Button, Icon } from 'antd';

import { memoType } from '../../types';
import styles from './Header.module.scss';

const { confirm } = Modal;

function Header(props) {
  const { memo, editable, onEditable, onDelete } = props;
  const handleDelete = useCallback(() => {
    confirm({
      title: '메모를 삭제하겠습니까?',
      onOk: onDelete,
    });
  }, [onDelete]);

  return (
    <Row>
      <Col span={20}>
        <h3 className={styles.editable} id="MEMO-TITLE" contentEditable={editable} onClick={() => onEditable(true)}>
          {memo.title}
        </h3>
      </Col>
      <Col span={4} style={{ textAlign: 'right' }}>
        <Button onClick={handleDelete}>
          <Icon type="delete" />
        </Button>
      </Col>
    </Row>
  );
}

Header.propTypes = {
  memo: memoType.isRequired,
  editable: PropTypes.bool,
  onEditable: PropTypes.func,
  onDelete: PropTypes.func,
};

Header.defaultProps = {
  editable: false,
  onEditable: () => null,
  onDelete: () => null,
};

export default Header;
