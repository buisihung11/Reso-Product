import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import { connect, Link } from 'umi';
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import AsyncButton from '@/components/AsyncButton';
import { useDebounceFn, useFormTable } from '@umijs/hooks';
import { buildParams } from '@/utils/utils';
import { getTableData } from '@/services/table';

const columns = [
  {
    title: 'Tên Sản Phẩm',
    dataIndex: 'name',
    fixed: 'left',
    render: (text, record) => <Link to={`/menu/${record.key}`}>{text}</Link>,
  },
  {
    title: 'Nhóm sản phẩm',
    dataIndex: 'productCategory',
  },
  {
    title: 'Loại sản phẩm',
    dataIndex: 'productType',
  },
  {
    title: 'Giá',
    dataIndex: 'price',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    render: () => <Tag color="green">Đang bán</Tag>,
  },
];

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 4 },
};
const ProductList = ({ history }) => {
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
  const { submit } = search;
  const { run: changeFilter } = useDebounceFn(submit, 500);

  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: setSelectedRows,
  };
  const hasSelected = selectedRows.length > 0;

  return (
    <PageContainer content="Danh sách sản phẩm">
      <Form form={form} onFieldsChange={changeFilter} layout="inline">
        <Card bordered={false} style={{ width: '100%' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Row justify="space-between">
              <Col span={16}>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item label="Tên sản phẩm">
                      <Input placeholder="Pizza" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Nhóm sản phẩm">
                      <Select placeholder="Chọn nhóm">
                        <Select.Option value="demo">Demo</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Button
                  type="primary"
                  onClick={() => history.push('/product/create')}
                  icon={<PlusOutlined />}
                >
                  Thêm Sản phẩm
                </Button>
              </Col>
            </Row>
            <Row justify="end">
              {hasSelected && (
                <AsyncButton
                  btnProps={{ danger: true, type: 'primary' }}
                  onClick={() => message.success('Delete success')}
                  title={`Delete ${selectedRows.length} items`}
                />
              )}
            </Row>
            <Table rowKey="id" rowSelection={rowSelection} columns={columns} {...tableProps} />
          </Space>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default ProductList;