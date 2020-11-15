import { Col, Empty, Form, Input, Modal, Radio, Row, Switch, Typography } from 'antd';
import React, { useEffect } from 'react';

const ProductMenuModal = ({ product, visible, onOk, onCancel, updateMode, ...props }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!!product) {
      form.setFieldsValue(product);
    }
  }, [product]);

  const getMenuPriceFormItem = () => {
    const formPriceItems = [];
    for (let index = 0; index < 10; index += 2) {
      const key1 = `price${index + 1};`;
      const key2 = `price${index + 2};`;
      formPriceItems.push(
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item key={`product_menu_${key1}`} name={key1} label={`Giá ${index + 1}`}>
              <Input disabled={!updateMode} type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item key={`product_menu_${key2}`} name={key2} label={`Giá ${index + 2}`}>
              <Input disabled={!updateMode} type="number" />
            </Form.Item>
          </Col>
        </Row>,
      );
    }
    return formPriceItems;
  };

  return (
    <Modal title="Chi tiết menu" visible={visible} onOk={onOk} onCancel={onCancel} {...props}>
      <Form form={form} layout="horizontal" name="product_in_menu_modal">
        <Form.Item name="name" label="Tên sản phẩm">
          <Typography.Text>{product?.name}</Typography.Text>
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
