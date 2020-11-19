import { PRODUCT_COMBO, PRODUCT_COMPLEX, PRODUCT_SINGLE } from '@/utils/constraints';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Divider, Row, Col, Form, Select, Tooltip } from 'antd';
import React from 'react';
import CreateComboForm from '../components/CreateComboForm';

const CombinationStep = ({ productType = PRODUCT_SINGLE, form }) => {
  return (
    <div style={{ width: '100%' }}>
      <Row>
        {productType === PRODUCT_COMPLEX && (
          <Col span={12}>
            <Form.Item
              label="Dòng sản phẩm"
              name="general_product_id"
              rules={[
                {
                  required: true,
                },
              ]}
            ></Form.Item>
          </Col>
        )}
      </Row>
      <Divider orientation="left">Thuộc tính</Divider>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="size"
            normalize={(arr) => arr.join(',')}
            label={
              <span>
                Size&nbsp;
                <Tooltip title="Các thuộc tính cách nhau bởi dấu phẩy">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
          >
            <Select
              placeholder="Bỏ trống nếu không có"
              mode="tags"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="base"
            normalize={(arr) => arr.join(',')}
            label={
              <span>
                Base&nbsp;
                <Tooltip title="Các thuộc tính cách nhau bởi dấu phẩy">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
          >
            <Select
              placeholder="Bỏ trống nếu không có"
              mode="tags"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
            />
          </Form.Item>
        </Col>
      </Row>
      {(productType === PRODUCT_COMBO || productType === PRODUCT_COMPLEX) && (
        <CreateComboForm form={form} />
      )}
    </div>
  );
};

export default CombinationStep;
