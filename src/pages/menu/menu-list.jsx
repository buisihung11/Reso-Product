import { Button, Card, Col, Form, Row, Space, Table, Tag } from 'antd';
import { connect, Link } from 'umi';
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useFormTable } from '@umijs/hooks';
import { buildParams, convertDateToStr, getCurrentStore, renderDayMenu } from '@/utils/utils';
import { getTableData2 } from '@/services/table';
import CreateMenuModal from './components/CreateMenuModal';
import { addMenuIntoStore } from '@/services/menu';

const columns = [
  {
    title: 'Tên Menu',
    dataIndex: 'menu_name',
    fixed: 'left',
    render: (text, record) => (
      <Link
        to={{
          pathname: `/menu/${record.menu_id}`,
          state: { menu_info: record },
        }}
      >
        {text}
      </Link>
    ),
  },
  {
    title: 'Ngày áp dụng',
    dataIndex: 'day_filter',
    render: (days) => renderDayMenu(days).map((day) => <Tag>{day}</Tag>),
  },
  {
    title: 'Thời gian áp dụng',
    dataIndex: 'time_from_to',
    render: ([from, to]) => (
      <span>
        {from}-{to}
      </span>
    ),
  },
];

const MenuList = (props) => {
  const { submitting } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [form] = Form.useForm();

  const { tableProps, search, sorter } = useFormTable(
    ({ current, pageSize, sorter: s, filters }, formData) => {
      // build filters
      const options = {
        params: buildParams({ current, pageSize }, s, formData),
      };
      const currentStoreID = getCurrentStore();
      return getTableData2(`stores/${currentStoreID}/menus`, options);
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
  const { submit: refetch } = search || {};

  const onCreate = async (values) => {
    const {
      time_from_to: [from, to],
    } = values;
    const parsedBody = {
      ...values,
      time_from_to: [convertDateToStr(from, 'hh:mm'), convertDateToStr(to, 'hh:mm')],
    };
    return addMenuIntoStore(parsedBody, getCurrentStore()).then(refetch);
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <PageContainer content="Tạo menu">
      <Card bordered={false}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Row justify="space-between">
            <Col span={16}></Col>
            <Col>
              <CreateMenuModal onCreate={onCreate} />
            </Col>
          </Row>
          <Table rowKey="menu_id" columns={columns} {...tableProps} />
        </Space>
      </Card>
    </PageContainer>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['formAndbasicForm/submitRegularForm'],
}))(MenuList);
