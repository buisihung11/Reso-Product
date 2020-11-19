import { ARTICLE_TYPE_DATA } from '@/utils/constraints';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Typography, Row, Col, Radio } from 'antd';
import React, { useState } from 'react';

const ConfigTypeModal = ({ onOk, onCancel, ...props }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onCancelModel = () => {
    form.resetFields();
    onCancel();
    setVisible(false);
  };

  const onOkModal = () => {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);
        return onOk(values);
      })
      .then(() => {
        form.resetFields();
        setConfirmLoading(false);
        setVisible(false);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      })
      .finally();
  };

  return (
    <>
      <Button type="ghost" onClick={() => setVisible(true)} icon={<PlusOutlined />}>
        Cấu hình
      </Button>
      <Modal
        confirmLoading={confirmLoading}
        title="Cấu hình"
        okButtonProps="Cập nhật"
        visible={visible}
        onOk={onOkModal}
        onCancel={onCancelModel}
        {...props}
      >
        <Form form={form} layout="horizontal" name="product_in_menu_modal">
          <Form.Item name="product_in_menu_id" hidden />
          <Form.Item name="product_id" hidden />
          <Row gutter={8}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Chỉ hiện loại bài viết"
                name="type"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn loại bài viết',
                  },
                ]}
              >
                <Radio.Group options={ARTICLE_TYPE_DATA} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

ConfigTypeModal.defaultProps = {
  product: {},
  updateMode: false,
  onCancel: () => null,
};

export default ConfigTypeModal;
