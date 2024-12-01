import React from 'react';
import { Controller } from 'react-hook-form';
import { Select } from 'antd';
import '../style.css';  // Import the CSS file

const { Option } = Select;

const Dropdown = ({ name, label, control, options, rules }) => (
  <div className="dropdown-container">
    <label className="dropdown-label">{label}</label>
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <>
          <Select
            {...field}
            style={{ width: '100%' }} // Make the select input take up full width
            placeholder="Select an option"
            value={field.value || undefined}
          >
            {options.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.name}
              </Option>
            ))}
          </Select>
          {error && <div className="dropdown-error">{error.message}</div>}
        </>
      )}
    />
  </div>
);

export default Dropdown;
