import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { List, Button, Modal, Select, Form } from 'antd';

import { attachLabel, detachLabel, listLabel } from '../../modules/labels';
import { deleteMemos } from '../../modules/memos';

const { Option } = Select;
const { confirm } = Modal;

function Config(props) {
  const { memos, labelId, initSelectMemos } = props;
  const [selectedLabel, setLabel] = useState(null);
  const [visibleModal, setModalStatus] = useState(false);
  const [finishUpdate, setFinish] = useState(false);
  const labels = useSelector(state => state.labels.labels.filter(label => label['_id'] !== 'all'));
  const dispatch = useDispatch();

  const handleLabelChange = useCallback(async () => {
    if (!selectedLabel) {
      return;
    }

    await dispatch(attachLabel(selectedLabel, memos));
    initSelectMemos();
    setFinish(true);
  }, [dispatch, initSelectMemos, memos, selectedLabel]);

  const handleDetachLabel = useCallback(async () => {
    await dispatch(detachLabel(labelId, memos));
    initSelectMemos();
    setFinish(true);
  }, [dispatch, initSelectMemos, labelId, memos]);

  const handleDeleteMemos = useCallback(async () => {
    await dispatch(deleteMemos(memos));
    await dispatch(listLabel());
    initSelectMemos();
    setFinish(true);
  }, [dispatch, initSelectMemos, memos]);

  const handleClickDetach = useCallback(() => {
    confirm({
      onOk: handleDetachLabel,
      okText: '라벨 제거',
      cancelText: '취소',
      title: '선택한 메모의 라벨을 제거 하시겠습니까?',
    });
  }, [handleDetachLabel]);

  const handleClickDelete = useCallback(() => {
    confirm({
      onOk: handleDeleteMemos,
      okText: '메모 삭제',
      cancelText: '취소',
      title: '선택한 메모의 삭제 하시겠습니까?',
    });
  }, [handleDeleteMemos]);

  if (finishUpdate) {
    return <Redirect to={`/labels/${labelId}`} />;
  }

  return (
    <React.Fragment>
      <List.Item>
        <Button style={{ marginRight: '10px' }} onClick={() => setModalStatus(true)}>
          라벨 변경
        </Button>
        <Button style={{ marginRight: '10px' }} onClick={handleClickDetach}>
          라벨 제거
        </Button>
        <Button style={{ marginRight: '10px' }} onClick={handleClickDelete}>
          메모 삭제
        </Button>
      </List.Item>
      <Modal visible={visibleModal} onOk={handleLabelChange} onCancel={() => setModalStatus(false)}>
        <Form>
          <Select placeholder="라벨 선택" onChange={value => setLabel(value)}>
            {labels.map(label => (
              <Option key={label['_id']} value={label['_id']}>
                {label.title}
              </Option>
            ))}
          </Select>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

Config.propTypes = {
  memos: PropTypes.arrayOf(PropTypes.string).isRequired,
  labelId: PropTypes.string.isRequired,
  initSelectMemos: PropTypes.func.isRequired,
};

export default Config;
