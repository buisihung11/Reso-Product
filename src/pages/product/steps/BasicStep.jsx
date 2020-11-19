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
  InputNumber,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { buildCategoriesOption } from '@/components/CommonSelect/utils';
import { normalizeImg, normFile } from '@/utils/utils';

const BasicStep = ({ onChangeProductType, updateMode = false, ...props }) => {
  return (
    <div bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
      <Row>
        <Col span={24}>
          <Form.Item
            valuePropName="fileList"
            getValueFromEvent={normFile}
            normalize={normalizeImg}
            name="pic_url"
            label="Ảnh đại điện"
          >
            <ImageUploader style={{ height: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="code"
            label="Mã sản phẩm"
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Vui lòng nhập mã sản phẩm',
              },
            ]}
          >
            <Input placeholder="PROD-1" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="product_name"
            label="Tên sản phẩm"
            rules={[
              {
                required: true,
                type: 'string',
                message: 'Vui lòng nhập Tên sản phẩm',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="product_type"
            label="Loại sản phẩm (ProductType)"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn loại sản phẩm',
              },
            ]}
          >
            <CommonSelect.SelectProductType
              size="large"
              onChange={({ target: { value } }) => onChangeProductType(value)}
              disabled={updateMode}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="base_price"
            label="Giá tham khảo"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn Giá tham khảo',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="cat_id"
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
        <Col span={12}>
          <Form.Item name="is_available" label="Kích hoạt" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default BasicStep;
