import { getTableData } from '@/services/table';
import { buildParams } from '@/utils/utils';
import { useFormTable } from '@umijs/hooks';
import { Button, Form, Row, Space, Table } from 'antd';
import React, { useState } from 'react';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
  },
  {
    title: 'Giá',
    dataIndex: 'price',
  },
  {
    title: 'Update',
    render: (text, prod) => (
      <Button onClick={() => console.log('prod', prod)} type="link">
        Update
      </Button>
    ),
  },
];

const ProductMenuTable = ({ menuId }) => {
  const [form] = Form.useForm();

  const { tableProps, search, sorter } = useFormTable(
    ({ current, pageSize, sorter: s, filters }, formData) => {
      // build filters
      const options = {
        params: buildParams({ current, pageSize }, s, formData),
      };
      return getTableData(`menus/${menuId}/products`, options);
    },
    {
      defaultPageSize: 10,
      defaultParams: [
        {
          current: 1,
          pageSize: 10,
        },
      ],
      form,
      paginated: true,
    },
  );
  console.log('tableProps', tableProps);

  return <Table rowKey="id" columns={columns} {...tableProps} />;
};

export default ProductMenuTable;
