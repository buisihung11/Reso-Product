import { ARTICLE_TYPE_DATA } from '@/utils/constraints';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
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
      <Button type="ghost" onClick={() => setVisible(true)} icon={<SettingOutlined />}>
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
        <Form style={{ width: '100%' }} form={form} layout="vertical" name="product_in_menu_modal">
          <Row gutter={8}>
            <Col span={24}>
              <Form.Item
                label="Chỉ hiện loại bài viết"
                name="articleType"
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
