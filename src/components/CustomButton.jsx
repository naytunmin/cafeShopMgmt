import React from 'react';
import { Button, Row, Col } from 'antd';
import '../style.css';  // Import the CSS file

const CustomButton = ({ onClick, label }) => (
  <Row gutter={[16, 16]} className="custom-button-container">
    <Col span={24}>
      <Button
        type="primary"
        onClick={onClick}
        className="custom-button"
      >
        {label}
      </Button>
    </Col>
  </Row>
);

export default CustomButton;
