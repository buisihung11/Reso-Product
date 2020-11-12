import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const days = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'];

const SelectDay = ({ value, onChange, ...props }) => {
  const options = days.map((d, index) => (
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
