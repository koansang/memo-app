import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Modal, Input, Form } from 'antd';

function FormModal(props) {
  const { visible, title, inputId, initialValue, onSubmit, onCancel, form } = props;
  const { getFieldDecorator, validateFields, resetFields } = form;

  const handleSubmit = useCallback(() => {
    validateFields((error, values) => {
      if (error) {
        return;
      }

      resetFields([inputId]);
      onSubmit(values[inputId]);
    });
  }, [inputId, onSubmit, resetFields, validateFields]);

  const handCancel = useCallback(() => {
    resetFields([inputId]);
    onCancel();
  }, [inputId, onCancel, resetFields]);

  return (
    <Modal visible={visible} title={title} onOk={handleSubmit} onCancel={handCancel} keyboard={false}>
      <Form layout="vertical">
        <Form.Item label="라벨명을 입력 해 주세요.">
          {getFieldDecorator(inputId, {
            rules: [
              {
                required: true,
                message: '필수 입력 값입니다.',
              },
            ],
            initialValue,
          })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  );
}

FormModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  inputId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  form: PropTypes.object.isRequired,
  title: PropTypes.string,
  initialValue: PropTypes.string,
};

FormModal.defaultProps = {
  title: null,
  initialValue: '',
};

export default Form.create({ name: 'form_in_modal' })(FormModal);
