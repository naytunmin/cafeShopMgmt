import React from 'react';
import { Button, Row, Col } from 'antd';


const ActionButtons = ({ isEdit, onCancel, actionType }) => {
  const isCafeShop = actionType === 'cafeShop';
  const isEmployee = actionType === 'employee';

  return (
    <Row gutter={16} style={{ marginTop: '20px' }}>
      <Col span={12}>
      <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
        {isEdit ? 'Update' : 'Create'}
      </Button>
      </Col>
      <Col span={12}>
        <Button type="default" onClick={onCancel} style={{ width: '100%' }}>
          Cancel
        </Button>
      </Col>
    </Row>
  );
};

export default ActionButtons;
