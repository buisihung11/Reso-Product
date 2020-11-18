import { getTableData2 } from '@/services/table';
import { buildParams, getCurrentStore } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { useFormTable } from '@umijs/hooks';
import { Form, Table, Tag, Row, Col, Select, Card, Button, Space } from 'antd';
import React from 'react';
import { Link } from 'umi';

const columns = [
  {
    title: 'Tên bài viết',
    dataIndex: 'article_name',
    fixed: 'left',
    render: (text, record) => <Link to={`/menu/${record.key}`}>{text}</Link>,
  },
  {
    title: 'Nhóm sản phẩm',
    dataIndex: 'category_id',
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'DateCreate',
  },
  {
    title: 'Mô tảr',
    dataIndex: 'description',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'isAvailable',
    render: () => <Tag color="green">Đang bán</Tag>,
  },
];

const ArticleList = ({ history }) => {
  const [form] = Form.useForm();
  //   const [selectedRows, setSelectedRows] = useState([]);

  const { tableProps, search, sorter } = useFormTable(
    ({ current, pageSize, sorter: s, filters }, formData) => {
      // build filters
      const options = {
        params: buildParams({ current, pageSize }, s, formData),
      };
      return getTableData2(`stores/${getCurrentStore()}/articles`, options);
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
  return (
    <PageContainer content="Danh sách sản phẩm">
      <Form form={form} layout="inline">
        <Card bordered={false} style={{ width: '100%' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Row justify="space-between">
              {/* <Col span={16}>
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
              </Col> */}
              <Col>
                <Button
                  type="primary"
                  onClick={() => history.push('/article/create')}
                  icon={<PlusOutlined />}
                >
                  Thêm Sản phẩm
                </Button>
              </Col>
            </Row>
            {/* <Row justify="end">
              {hasSelected && (
                <AsyncButton
                  btnProps={{ danger: true, type: 'primary' }}
                  onClick={() => message.success('Delete success')}
                  title={`Delete ${selectedRows.length} items`}
                />
              )}
            </Row> */}
            <Table
              scroll={{ x: 600 }}
              rowKey="id"
              //   rowSelection={rowSelection}
              columns={columns}
              {...tableProps}
            />
          </Space>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default ArticleList;
