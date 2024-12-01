// SuccessModal.js
import React from 'react';
import { Modal } from 'antd';

const SuccessModal = ({ open, message, onOk }) => {
  return (
    <Modal
      title="Success"
      open={open} 
      onOk={onOk}
      onCancel={onOk}
      footer={[
        <button key="ok" onClick={onOk}>
          OK
        </button>,
      ]}
    >
      <p>{message}</p>
    </Modal>
  );
};

export default SuccessModal;
