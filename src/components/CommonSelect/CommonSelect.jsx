/* eslint-disable @typescript-eslint/no-shadow */
import { getCategories } from '@/services/category';
import { getStore } from '@/services/store';
import { getCurrentStore } from '@/utils/utils';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

const buildOptionsDefault = (storeData = []) =>
  storeData?.map((d) => <Option key={d.id}>{d.name}</Option>);

const normalizeResDefault = (res) => res;

const normalizeRes = (res) => {
  return res?.data;
};

const CommonSelect = ({
  value,
  onChange,
  buildOptions = buildOptionsDefault,
  onSearch,
  normalizeRes,
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
    if (onChange) onChange(value);
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

const SelectStore = (props) => {
  return (
    <CommonSelect
      fetchOnFirst
      defaultValue={getCurrentStore()}
      onSearch={getStore}
      normalizeRes={normalizeRes}
      style={{ width: 200 }}
      {...props}
    />
  );
};

const SelectCategory = (props) => {
  return <CommonSelect fetchOnFirst onSearch={getCategories} {...props} />;
};

CommonSelect.SelectCategory = SelectCategory;
CommonSelect.SelectStore = SelectStore;

CommonSelect.defaultProps = {
  onSearch: () => [],
  normalizeRes: (res) => res.data,
};

export { SelectStore, SelectCategory };
export default CommonSelect;
