import { Input, Form, Select, Modal } from 'antd';
import { formatMessage } from 'umi';
import React, { useState } from 'react';
import SelectDay from '@/components/SelectDay';
import request from '@/utils/request';
import SelectStore from '@/components/CommonSelect/CommonSelect';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

const onSearchStore = (searchValue) => {
  return request.get(`/menus`, { useCache: true });
};

const MenuCreateModal = ({ visible, onCreate, onCancel, submitting }) => {
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 12,
      },
      md: {
        span: 10,
      },
    },
  };
  const submitFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 7,
      },
    },
  };

  return (
    <Modal
      visible={visible}
      title="Tạo menu"
      okText="Thêm"
      cancelText="Hủy"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        style={{
          marginTop: 8,
        }}
        form={form}
        name="basic"
      >
        <FormItem
          {...formItemLayout}
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
        <FormItem
          {...formItemLayout}
          label="Các ngày hiệu lực"
          name="days"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'formandbasic-form.date.required',
              }),
            },
          ]}
        >
          <SelectDay />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Thời gian hiệu lực"
          name="timeApply"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'formandbasic-form.date.required',
              }),
            },
          ]}
        >
          <RangePicker
            picker="time"
            showTime
            // use12Hours
            // format="h:mm"
            minuteStep={15}
            style={{
              width: '100%',
            }}
            placeholder={['Từ', 'Đến']}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
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
            defaultValue={localStorage.getItem('CURRENT_STORE')}
            disabled={localStorage.getItem('CURRENT_STORE') !== null}
            onSearch={onSearchStore}
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default MenuCreateModal;
