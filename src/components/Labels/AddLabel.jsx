import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Modal, Input, Form } from 'antd';

import FormModal from '../shared/FormModal';

function AddLabel(props) {
  const { dispatch } = props;
  const [visibleModal, setModalStatus] = useState(false);
  const buttonCallback = useCallback(() => {
    setModalStatus(!visibleModal);
  }, [visibleModal]);
  const addCallback = useCallback(
    title => {
      buttonCallback();
      dispatch(title);
    },
    [buttonCallback, dispatch],
  );

  return (
    <React.Fragment>
      <Button block onClick={buttonCallback}>
        <Icon type="plus" />
        라벨추가
      </Button>
      <FormModal
        visible={visibleModal}
        onSubmit={addCallback}
        onCancel={buttonCallback}
        title="라벨 추가"
        inputId="ADD_LABEL"
      />
    </React.Fragment>
  );
}

AddLabel.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default AddLabel;
