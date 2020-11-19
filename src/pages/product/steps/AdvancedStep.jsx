import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Row, Col, Form, Divider, Tooltip, Select, Input, Button } from 'antd';

import request from '@/utils/requestServer';
import { SelectCollections } from '@/components/CommonSelect/CommonSelect';

const onSearchCollection = (searchValue) => {
  return request.get(`/menus`);
};

const AdvancedStep = (props) => {
  return (
    <Row style={{ width: '100%' }}>
      <Col span={12}>
        <Form.Item label="Bộ sưu tập" name="collections">
          <SelectCollections mode="multiple" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default AdvancedStep;
