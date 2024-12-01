import React from 'react';
import { Modal } from 'antd';

const ConfirmModal = ({ open, title, onConfirm, onCancel }) => {
  return (
    <Modal
      open={open} 
      title={title}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Yes"
      cancelText="No"
    >
    </Modal>
  );
};

export default ConfirmModal;
