/* eslint-disable @typescript-eslint/no-shadow */
import { getCategories } from '@/services/category';
import { PRODUCT_TYPE_DATA } from '@/utils/constraints';
import { getCollections, getStore } from '@/services/store';
import { getCurrentStore } from '@/utils/utils';
import { Radio, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { buildCategoriesOption } from './utils';

const { Option } = Select;

const buildOptionsDefault = (storeData = []) =>
  storeData?.map((d) => (
    <Option value={d.id} key={d.id}>
      {d.name}
    </Option>
  ));

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
  const [fetchingData, setFetchingData] = useState(false);
  useEffect(() => {
    if (fetchOnFirst) {
      setFetchingData(true);
      Promise.resolve(onSearch())
        .then((res) => {
          return normalizeRes(res);
        })
        .then((data) => setStoreData(data))
        .then(() => setFetchingData(false));
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
      loading={fetchingData}
      placeholder="Vui lòng chọn cửa hàng"
      defaultActiveFirstOption={false}
      showArrow
      filterOption={false}
      //   onSearch={fetchOnFirst ? null : handleSearch}
      notFoundContent={null}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      {...props}
      onChange={handleChange}
    >
      {options}
    </Select>
  );
};

const SelectStore = (props) => {
  return (
    <CommonSelect
      fetchOnFirst
      defaultValue={+getCurrentStore()}
      onSearch={getStore}
      normalizeRes={normalizeRes}
      style={{ width: 200 }}
      {...props}
    />
  );
};

const SelectCategory = (props) => {
  return (
    <CommonSelect
      placeholder="Vui lòng chọn loại sản phẩm"
      fetchOnFirst
      buildOptions={buildCategoriesOption}
      onSearch={getCategories}
      {...props}
    />
  );
};

const SelectProductType = (props) => {
  return (
    <Radio.Group
      placeholder="Vui lòng loại sản phẩrmf"
      options={PRODUCT_TYPE_DATA}
      // optionType="button"
      buttonStyle="solid"
      {...props}
    />
  );
};
const SelectCollections = (props) => {
  return <CommonSelect fetchOnFirst onSearch={getCollections} {...props} />;
};

CommonSelect.SelectCategory = SelectCategory;
CommonSelect.SelectStore = SelectStore;
CommonSelect.SelectProductType = SelectProductType;
CommonSelect.SelectCollections = SelectCollections;

CommonSelect.defaultProps = {
  onSearch: () => [],
  normalizeRes: (res) => res.data,
};

export { SelectStore, SelectCategory, SelectProductType, SelectCollections };
export default CommonSelect;
