import React, { useState } from 'react';

import CommonSelect from '@/components/CommonSelect/CommonSelect';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import request from '@/utils/requestServer';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Card,
  Form,
  Input,
  Typography,
  Row,
  Col,
  Radio,
  Switch,
  Affix,
  Button,
  Divider,
  Tooltip,
  Select,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { buildCategoriesOption } from '@/components/CommonSelect/utils';
import { normFile } from '@/utils/utils';

const BasicStep = ({ onChangeProductType, ...props }) => {
  return (
    <div bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
      <Row>
        <Col span={24}>
          <Form.Item
            valuePropName="fileList"
            getValueFromEvent={normFile}
            name="image"
            label="Ảnh đại điện"
          >
            <ImageUploader style={{ height: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="productCode"
            label="Mã sản phẩm"
            rules={[
              {
                required: true,
                type: 'string',
              },
            ]}
          >
            <Input placeholder="PROD-1" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="productName"
            label="Tên sản phẩm"
            rules={[
              {
                required: true,
                type: 'string',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item
            name="productType"
            label="Loại sản phẩm (ProductType)"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <CommonSelect.SelectProductType
              size="large"
              onChange={({ target: { value } }) => onChangeProductType(value)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="active" label="Kích hoạt" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="productCategory"
            label="Nhóm sản phẩm (Category)"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <CommonSelect.SelectCategory
              buildOptions={buildCategoriesOption}
              placeholder="Vui lòng chọn nhóm sản phẩm"
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default BasicStep;
