/* eslint-disable @typescript-eslint/no-shadow */
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

const buildOptionsDefault = (storeData = []) =>
  storeData.map((d) => (
    <Option va key={d.id}>
      {d.name}
    </Option>
  ));

const normalizeResDefault = (res) => res;

const CommonSelect = ({
  value,
  onChange,
  buildOptions = buildOptionsDefault,
  onSearch,
  normalizeRes = normalizeResDefault,
  fetchOnFirst,
  ...props
}) => {
  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    if (fetchOnFirst) {
      Promise.resolve(onSearch())
        .then((res) => {
          return normalizeRes(res);
        })
        .then((data) => setStoreData(data));
    }
  }, [fetchOnFirst, onSearch, normalizeRes]);

  const options = buildOptions(storeData);

  const handleSearch = (searchValue) => {
    if (searchValue && !fetchOnFirst) {
      // call to fetch data
      Promise.resolve(onSearch(searchValue))
        .then((res) => {
          return normalizeRes(res);
        })
        .then((data) => setStoreData(data));
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
      //   onSearch={fetchOnFirst ? null : handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      {...props}
    >
      {options}
    </Select>
  );
};

export default CommonSelect;
