import { Select } from 'antd';

export const buildCategoriesOption = (data) =>
  data?.map(({ cate_id, cate_name }) => <Select.Option key={cate_id}>{cate_name}</Select.Option>);
