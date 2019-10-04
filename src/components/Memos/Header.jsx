import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Button, Icon, Modal } from 'antd';
import { Link } from 'react-router-dom';

import { labelType, routerType } from '../../types';
import { deleteLabel, listLabel } from '../../modules/labels';
import HeaderTitle from './HeaderTitle';

const { confirm } = Modal;

function Header(props) {
  const { history, label } = props;
  const dispatch = useDispatch();
  const handleDeleteLabel = useCallback(() => {
    confirm({
      title: `${label.title} 라벨을 삭제하겠습니까?`,
      content: '삭제 된 라벨은 복구 되지 않습니다.',
      onOk: async () => {
        await dispatch(deleteLabel(label['_id']));
        await dispatch(listLabel());
        history.replace('/');
      },
    });
  }, [dispatch, history, label]);

  const isAll = label['_id'] === 'all';

  return (
    <Row gutter={8} align="middle">
      <HeaderTitle label={label} />
      <Col span={10} style={{ textAlign: 'right' }}>
        <Link to={`/labels/${label['_id']}/memos/new`}>
          <Button size="small">
            <Icon type="file-add" />
          </Button>
        </Link>
        {!isAll && (
          <Button style={{ marginLeft: '4px' }} size="small" onClick={handleDeleteLabel}>
            <Icon type="delete" />
          </Button>
        )}
      </Col>
    </Row>
  );
}

Header.propTypes = {
  label: labelType.isRequired,
  history: routerType.isRequired,
};

export default Header;
