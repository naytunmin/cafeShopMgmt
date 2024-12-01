import React from 'react';
import { Controller } from 'react-hook-form';
import { Radio } from 'antd';

const RadioGroup = ({ name, label, control, options, rules }) => {
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
            <Radio.Group {...field}>
              {options.map((option) => (
                <Radio key={option.value} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
            {error && <div style={{ color: 'red', marginTop: '4px' }}>{error.message}</div>}
          </>
        )}
      />
    </div>
  );
};

export default RadioGroup;
