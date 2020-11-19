import { Select } from 'antd';

export const buildCategoriesOption = (data) =>
  data?.map(({ cate_id, cate_name }) => (
    <Select.Option value={cate_id} key={cate_id}>
      {cate_name}
    </Select.Option>
  ));
