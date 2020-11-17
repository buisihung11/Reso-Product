import { getTableData2 } from '@/services/table';
import { buildParams } from '@/utils/utils';
import { useFormTable } from '@umijs/hooks';
import { Button, Form, Row, Space, Table } from 'antd';
import React, { useState } from 'react';
import request from 'umi-request';

const columns = [
  {
    title: 'ID',
    dataIndex: 'product_id',
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'product_name',
  },
  {
    title: 'Giá cơ bản',
    dataIndex: 'price1',
  },
];

const ProductTable = ({ onRowSelection }) => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowkeys] = useState([]);

  const { tableProps, search, sorter } = useFormTable(
    ({ current, pageSize, sorter: s, filters }, formData) => {
      // build filters
      const options = {
        params: buildParams({ current, pageSize }, s, formData),
      };
      return request.get(`http://13.250.232.85/api/v1/products`, options).then((res) => ({
        total: res.metadata.total,
        list: res.data,
      }));
      // return getTableData2('products', options);
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

  const rowSelection = {
    type: 'radio',
    selectedRowKeys,
    onChange: (selectedkeys, selectedRows) => {
      onRowSelection(selectedkeys, selectedRows);
      setSelectedRowkeys(selectedkeys);
    },
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Table
      style={{ width: '100%' }}
      rowKey="product_id"
      rowSelection={rowSelection}
      columns={columns}
      {...tableProps}
    />
  );
};

ProductTable.defaultProps = {
  onRowSelection: (selected) => selected,
};

export default ProductTable;
