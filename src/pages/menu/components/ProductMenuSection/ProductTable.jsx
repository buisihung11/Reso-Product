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
    title: 'Giá cơ bản',
    dataIndex: 'price',
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
      return getTableData('menus', options);
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
    selectedRowKeys,
    onChange: (selectedkeys, selectedRows) => {
      onRowSelection(selectedkeys, selectedRows);
      setSelectedRowkeys(selectedkeys);
    },
  };

  const hasSelected = selectedRowKeys.length > 0;

  return <Table rowKey="id" rowSelection={rowSelection} columns={columns} {...tableProps} />;
};

ProductTable.defaultProps = {
  onRowSelection: (selected) => selected,
};

export default ProductTable;
