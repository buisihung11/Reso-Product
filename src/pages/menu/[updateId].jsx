import React, { useEffect } from 'react';
import SelectStore from '@/components/SelectStore';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Typography, Input, DatePicker, Row, Col, Button } from 'antd';
import SelectDay from '@/components/SelectDay';
import AsyncButton from '@/components/AsyncButton';
import ProductTable from './components/ProductTable';
import ProductMenuTable from './components/ProductMenuTable';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

const UpdateMenu = (props) => {
  const {
    match: {
      params: { updateId },
    },
  } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    // fetch data from updateId
    form.setFieldsValue();
  }, [updateId]);

  const handlUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  console.log('props', props);
  return (
    <PageContainer>
      <Card bordered={false}>
        <Typography.Title level={4}>Update Menu {updateId}</Typography.Title>

        <Form
          style={{
            marginTop: 8,
          }}
          form={form}
          name="menuInfo"
        >
          <Row gutter={8}>
            <Col xs={24} md={12}>
              <FormItem
                label="Tên menu"
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên',
                  },
                ]}
              >
                <Input placeholder="Tên menu của cửa hàng" />
              </FormItem>
            </Col>
            <Col xs={24} md={6}>
              <FormItem
                label="Các ngày hiệu lực"
                name="days"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn ngày',
                  },
                ]}
              >
                <SelectDay />
              </FormItem>
            </Col>
            <Col xs={24} md={6}>
              <FormItem
                label="Thời gian hiệu lực"
                name="date"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập phần này',
                  },
                ]}
              >
                <RangePicker
                  picker="time"
                  showTime
                  use12Hours
                  format="h:mm a"
                  minuteStep={15}
                  style={{
                    width: '100%',
                  }}
                  placeholder={['Từ', 'Đến']}
                />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col xs={24} md={12}>
              <FormItem
                label="Cửa hàng áp dụng"
                name="store"
                rules={[
                  {
                    // required: true,
                    message: 'Vui lòng chọn cửa hàng',
                  },
                ]}
              >
                <SelectStore />
              </FormItem>
            </Col>
          </Row>

          <Row justify="end">
            <Button style={{ marginRight: '8px' }}>Hủy</Button>
            <AsyncButton type="primary" onClick={handlUpdate} title="Tạo" />
          </Row>
        </Form>

        {/* PRODUCT IN MENU */}
        <Typography.Title level={4}>Sản phẩm trong Menu</Typography.Title>
        <Row style={{ width: '100%' }}>
          <Col xs={24} md={10}>
            <Card>
              <Typography.Title level={5}>Thêm sản phẩm</Typography.Title>
              <ProductTable />
            </Card>
          </Col>
          <Col xs={24} md={14}>
            <Card bordered={false}>
              <Typography.Title level={5}>Sản phẩm đã thêm</Typography.Title>
              <ProductMenuTable menuId={updateId} />
            </Card>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default UpdateMenu;
