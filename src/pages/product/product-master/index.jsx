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
import { getTableData, getTableData2 } from '@/services/table';
import { PRODUCT_MASTER } from '@/utils/constraints';

const columns = [
  {
    title: 'Tên Dòng Sản Phẩm',
    dataIndex: 'product_name',
    fixed: 'left',
    render: (text, record) => {
      const updateProd = { ...record };
      updateProd.cat_id = record.category_id;
      updateProd.product_type = record.product_type_id;
      updateProd.pic_url = [{ response: record.pic_url }];
      updateProd.base_price = record.base_price ?? record.price1;
      updateProd.size = record.attributes.size?.split(',');
      updateProd.base = record.attributes.base?.split(',');
      updateProd.collections = record.collections?.map(({ id }) => id);

      console.log('updateProd', updateProd);

      return <Link to={{ pathname: `/product/update`, state: updateProd }}>{text}</Link>;
    },
  },
  {
    title: 'Nhóm sản phẩm',
    dataIndex: 'category_id',
  },
  {
    title: 'Loại sản phẩm',
    dataIndex: 'product_type_name',
  },
  {
    title: 'Giá',
    dataIndex: 'price1',
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
const ProductMasterList = ({ history }) => {
  const [form] = Form.useForm();
  const [selectedRows, setSelectedRows] = useState([]);

  const { tableProps, search, sorter } = useFormTable(
    ({ current, pageSize, sorter: s, filters }, formData) => {
      // build filters
      const options = {
        params: buildParams({ current, pageSize }, s, formData),
      };
      return getTableData2('products', {
        ...options,
        params: { ...options.params, 'product-type-id': PRODUCT_MASTER, fields: 'Collections' },
      });
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
    <PageContainer>
      <Form form={form} onFieldsChange={changeFilter} layout="inline">
        <Card bordered={false} style={{ width: '100%' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Row justify="space-between">
              <Col span={16}>
                <Row gutter={8}>
                  <Col xs={24} md={12}>
                    <Form.Item label="Tên sản phẩm">
                      <Input placeholder="Pizza" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
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
                  onClick={() => history.push('/product/product-master/create')}
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
            <Table
              scroll={{ x: 600 }}
              rowKey="id"
              // rowSelection={rowSelection}
              columns={columns}
              {...tableProps}
            />
          </Space>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default ProductMasterList;
