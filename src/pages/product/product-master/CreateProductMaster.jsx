import React from 'react';

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
import CreateComboForm from '../components/CreateComboForm';

const onSearchCollection = (searchValue) => {
  return request.get(`/menus`);
};

const CreateProductMaster = ({ productType = 'single' }) => {
  const [form] = Form.useForm();

  return (
    <PageContainer>
      <Form
        onFinish={(values) => console.log('Create Product', values)}
        colon
        form={form}
        name="productInfo"
        layout="vertical"
      >
        <Card bordered={false} style={{ width: '100%', minHeight: '1000px' }}>
          <Row justify="space-between">
            <Col>
              <Typography.Title level={5}>Thông tin chính</Typography.Title>
            </Col>
            <Col>
              <Affix offsetTop={10}>
                <Button type="primary" htmlType="submit">
                  Tạo
                </Button>
              </Affix>
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="productType"
                label="Loại sản phẩm"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <CommonSelect.SelectCategory
                  buildOptions={buildCategoriesOption}
                  placeholder="Vui lòng chọn loại sản phẩm"
                />
              </Form.Item>
            </Col>
          </Row>
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
            <Col span={12}>
              <Form.Item name="active" label="Kích hoạt" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="image" label="Ảnh đại điện">
                <ImageUploader />
              </Form.Item>
            </Col>
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
          {productType === 'single' && <CreateComboForm form={form} />}
        </Card>
      </Form>
    </PageContainer>
  );
};

export default CreateProductMaster;
