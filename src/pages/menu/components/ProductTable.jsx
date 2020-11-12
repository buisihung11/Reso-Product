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
];

const ProductTable = () => {
  const [form] = Form.useForm();
  const [selectedRows, setSelectedRows] = useState([]);

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
  console.log('tableProps', tableProps);

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
  };

  const hasSelected = selectedRows.length > 0;

  return (
    <Space direction="vertical">
      <Row justify="end">
        <Button type="primary" disabled={!hasSelected}>
          Thêm {hasSelected ? `${selectedRows.length} sản phẩm` : ''}
        </Button>
      </Row>
      <Table rowKey="id" rowSelection={rowSelection} columns={columns} {...tableProps} />
    </Space>
  );
};

export default ProductTable;
