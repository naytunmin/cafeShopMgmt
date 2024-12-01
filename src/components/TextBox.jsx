import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from 'antd';

const TextBox = ({ name, label, control, rules, placeholder, isTextArea }) => {
  const isRequired = rules && rules.required;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
      <label style={{ marginBottom: '8px' }}>
        {label}
        {isRequired && <span style={{ color: 'red' }}>*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            {isTextArea ? (
              <Input.TextArea
                {...field}
                placeholder={placeholder}
                maxLength={255}
                autoSize={{ minRows: 3, maxRows: 6 }} // This will allow the textarea to adjust its height
              />
            ) : (
              <Input {...field} placeholder={placeholder} />
            )}
            {error && (
              <div style={{ color: 'red', marginTop: '4px' }}>
                {error.message}
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};

export default TextBox;
