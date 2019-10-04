import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Button, Icon, Typography } from 'antd';

import { labelType } from '../../types';
import { editLabel } from '../../modules/labels';
import FormModal from '../shared/FormModal';

const { Title } = Typography;

function HeaderTitle(props) {
  const { label } = props;
  const [visibleModal, setModalStatus] = useState(false);
  const dispatch = useDispatch();
  const handleModal = useCallback(() => {
    setModalStatus(!visibleModal);
  }, [visibleModal]);
  const handleEditLabel = useCallback(
    title => {
      dispatch(editLabel(label['_id'], title));
      handleModal();
    },
    [dispatch, handleModal, label],
  );

  return (
    <Col span={14}>
      <Title level={3} ellipsis style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        {label ? label.title : ''}
      </Title>
      <Button size="small" style={{ marginLeft: '4px' }} onClick={handleModal}>
        <Icon type="edit" />
      </Button>
      <FormModal
        visible={visibleModal}
        onSubmit={handleEditLabel}
        title="라벨 이름 변경"
        inputId="EDIT-LABEL"
        onCancel={handleModal}
        initialValue={label.title}
      />
    </Col>
  );
}

HeaderTitle.propTypes = {
  label: labelType.isRequired,
};

export default HeaderTitle;
