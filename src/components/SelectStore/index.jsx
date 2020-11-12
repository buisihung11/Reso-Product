/* eslint-disable @typescript-eslint/no-shadow */
import { Select } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

const SelectStore = ({ value, onChange, ...props }) => {
  const [storeData, setStoreData] = useState([]);

  const options = storeData.map((d) => <Option key={d.value}>{d.text}</Option>);

  const handleSearch = (searchValue) => {
    if (searchValue) {
      // call to fetch data
    } else {
      setStoreData([]);
    }
  };

  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <Select
      showSearch
      value={value}
      placeholder="Vui lòng chọn cửa hàng"
      defaultActiveFirstOption={false}
      showArrow
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      {...props}
    >
      {options}
    </Select>
  );
};

export default SelectStore;
