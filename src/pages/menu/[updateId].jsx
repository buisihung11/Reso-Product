import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Typography, Input, DatePicker, Row, Col, Button } from 'antd';
import SelectDay from '@/components/SelectDay';
import AsyncButton from '@/components/AsyncButton';
import { getStore } from '@/services/store';
import ProductMenuSection from './components/ProductMenuSection';
import SelectStore from '@/components/CommonSelect/CommonSelect';

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

  const handlUpdateMenuInfo = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        // onCreate(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <PageContainer>
      <Form
        style={{
          marginTop: 8,
        }}
        form={form}
        layout="vertical"
        name="menuInfo"
      >
        <Card bordered={false}>
          <Row justify="space-between">
            <Col>
              <Typography.Title level={4}>Update Menu {updateId}</Typography.Title>
            </Col>
            <Col style={{ textAlign: 'right' }}>
              <Button style={{ marginRight: '8px' }}>Hủy</Button>
              {!form.isFieldsTouched() && (
                <AsyncButton
                  type="primary"
                  onClick={handlUpdateMenuInfo}
                  title="Cập nhật thông tin"
                />
              )}
            </Col>
          </Row>

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
                <SelectStore
                  fetchOnFirst
                  onSearch={getStore}
                  defaultValue={localStorage.getItem('CURRENT_STORE')}
                  disabled={localStorage.getItem('CURRENT_STORE') !== null}
                />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col xs={24} md={24}>
              <Form.Item label="Các ngày hiệu lực">
                <Input.Group compact>
                  <FormItem
                    label="Các ngày hiệu lực"
                    noStyle
                    name="days"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn ngày',
                      },
                    ]}
                  >
                    <SelectDay
                      style={{
                        width: '25%',
                      }}
                    />
                  </FormItem>
                  <FormItem
                    // label="Thời gian hiệu lực"
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
                      noStyle
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
                </Input.Group>
              </Form.Item>
            </Col>
          </Row>

          {/* PREPARE TO ADD */}

          <ProductMenuSection menuId={updateId} />
        </Card>
      </Form>
    </PageContainer>
  );
};

export default UpdateMenu;
