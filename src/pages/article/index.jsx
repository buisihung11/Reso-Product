import { getTableData2 } from '@/services/table';
import { buildParams, convertStrToDate, getCurrentStore } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { useFormTable } from '@umijs/hooks';
import ConfigTypeModal from './configTypeModal';
import { Form, Table, Tag, Row, Col, Card, Button, Space, Typography } from 'antd';
import React from 'react';
import { Link } from 'umi';
import { changeArticleType } from '@/services/article';

const columns = [
  {
    title: 'Tên bài viết',
    dataIndex: 'name',
    fixed: 'left',
    render: (text, record) => <Link to={`/article/${record.id}`}>{text}</Link>,
  },
  {
    title: 'Link bài viết',
    dataIndex: 'link',
    render: (link) => <Link to={`${link}`}>{link}</Link>,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'date_create',
    render: (text) => convertStrToDate(text, 'YYYY-MM-DD'),
  },
  {
    title: 'Mô tả',
    dataIndex: 'decription',
    render: (text) => (
      <Typography.Paragraph
        ellipsis={{
          rows: 3,
          expandable: true,
        }}
      >
        {text}
      </Typography.Paragraph>
    ),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'is_available',
    render: (is_available) => (
      <Tag color={is_available ? 'green' : 'magenta'}>
        {is_available ? 'Hoạt động' : 'Không hoạt động'}
      </Tag>
    ),
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

  const handleChangeCurrentType = ({ articleType }) => {
    return changeArticleType(getCurrentStore(), articleType);
  };

  return (
    <PageContainer content="Danh sách sản phẩm">
      <Form form={form} layout="inline">
        <Card bordered={false} style={{ width: '100%' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Row justify="end">
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
                <ConfigTypeModal onOk={handleChangeCurrentType} type="ghost" />
                <Button
                  type="primary"
                  onClick={() => history.push('/article/create')}
                  icon={<PlusOutlined />}
                  style={{ marginLeft: '8px' }}
                >
                  Thêm Bài Viết
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
