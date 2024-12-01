import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import '../style.css';  // Import the CSS file

const FileUpload = ({ onFileSelect }) => {
  const beforeUpload = (file) => {
    const maxSizeInMB = 2;

    if (file.size / 1024 / 1024 > maxSizeInMB) {
      message.error('The logo file size exceeds 2 MB.');
      return false; 
    }

    if (file.type !== 'image/png') {
      message.error('The logo file must be in PNG format.');
      return false;  
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onFileSelect(reader.result);
      message.success('File is valid and uploaded.');
    };

    reader.readAsDataURL(file);

    return false;
  };

  return (
    <div className="file-upload-container">
      <Upload
        beforeUpload={beforeUpload} 
        showUploadList={true}  
        accept="image/png" 
        maxCount={1}
      >
        <Button type="primary" className="file-upload-button">
          <UploadOutlined /> Click to Upload Logo
        </Button>
      </Upload>
    </div>
  );
};

export default FileUpload;
