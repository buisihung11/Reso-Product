import { Col, Empty, Form, Input, InputNumber, Modal, Radio, Row, Switch, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const ProductMenuModal = ({ product, visible, onOk, onCancel, updateMode, ...props }) => {
  const [form] = Form.useForm();

  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    // if (product != null) {
    //   form.setFieldsValue(product);
    // }
  }, [product]);

  const getMenuPriceFormItem = () => {
    const formPriceItems = [];
    for (let index = 0; index < 10; index += 2) {
      const key1 = `price${index + 1}`;
      const key2 = `price${index + 2}`;
      formPriceItems.push(
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item key={`product_menu_${key1}`} name={key1} label={`Giá ${index + 1}`}>
              <InputNumber disabled={!updateMode} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item key={`product_menu_${key2}`} name={key2} label={`Giá ${index + 2}`}>
              <InputNumber disabled={!updateMode} type="number" />
            </Form.Item>
          </Col>
        </Row>,
      );
    }
    return formPriceItems;
  };

  console.log('form.getFieldsValue', form.getFieldsValue());

  const handleOk = () => {
    setConfirmLoading(true);
    return form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onOk(values);
      })
      .then(() => setConfirmLoading(false))
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      confirmLoading={confirmLoading}
      title="Chi tiết menu"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      {...props}
    >
      <Form initialValues={product} form={form} layout="horizontal" name="product_in_menu_modal">
        <Form.Item name="product_in_menu_id" hidden />
        <Form.Item name="product_id" hidden />
        <Form.Item name="product_name" label="Tên sản phẩm">
          <Typography.Text>{product?.product_name}</Typography.Text>
        </Form.Item>
        {getMenuPriceFormItem()}
        <Form.Item name="fixedPrice" valuePropName="checked" label="Giá cố định">
          <Switch disabled={!updateMode} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

ProductMenuModal.defaultProps = {
  product: {},
  updateMode: false,
};

export default ProductMenuModal;
