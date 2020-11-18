import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Row, Col, Form, Divider, Tooltip, Select, Input } from 'antd';

import request from '@/utils/requestServer';
import CommonSelect from '@/components/CommonSelect/CommonSelect';
import CreateComboForm from '../components/CreateComboForm';

const onSearchCollection = (searchValue) => {
  return request.get(`/menus`);
};

const AdvancedStep = (props) => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="collection" label="Bộ sưu tập">
            <CommonSelect
              placeholder="Vui lòng chọn bộ sưu tập"
              onSearch={onSearchCollection}
              fetchOnFirst
            />
          </Form.Item>
        </Col>
        <Col span={12}></Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}></Col>
        <Col span={12}>
          <Form.Item name="collection" label="Mô tả">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left">Thuộc tính</Divider>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="size"
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
    </div>
  );
};

export default AdvancedStep;
