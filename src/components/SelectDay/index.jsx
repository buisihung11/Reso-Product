import React from 'react';
import { Select } from 'antd';
import { daysInWeek } from '@/utils/utils';

const { Option } = Select;

const SelectDay = ({ value, onChange, ...props }) => {
  const options = daysInWeek.map((d, index) => (
    <Option key={index} value={index}>
      {d}
    </Option>
  ));

  const handleChange = (value) => {
    if (onChange) onChange(value);
  };

  return (
    <Select
      showSearch
      value={value}
      placeholder="Vui lòng chọn ngày"
      defaultActiveFirstOption={false}
      showArrow
      filterOption={false}
      onChange={handleChange}
      mode="tags"
      {...props}
    >
      {options}
    </Select>
  );
};

export default SelectDay;
