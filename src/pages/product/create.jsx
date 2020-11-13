import CommonSelect from '@/components/CommonSelect/CommonSelect';
import ImageUploader from '@/components/ImageUploader/ImageUploader';
import request from '@/utils/request';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Input, Typography, Row, Col, Radio } from 'antd';
import React from 'react';

const onSearchProdCate = (searchValue) => {
  return request.get(`/menus`);
};
const onSearchCollection = (searchValue) => {
  return request.get(`/menus`);
};

const CreateProduct = () => {
  const [form] = Form.useForm();

  return (
    <PageContainer>
      <Card bordered={false} style={{ width: '100%' }}>
        <Typography.Title level={5}>Thông tin chính</Typography.Title>
        <Form colon form={form} name="productInfo" layout="vertical">
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
                name="productCategory"
                label="Nhóm sản phẩm"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <CommonSelect
                  placeholder="Vui lòng chọn nhóm sản phẩm"
                  onSearch={onSearchProdCate}
                  fetchOnFirst
                />
              </Form.Item>
            </Col>
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
                <CommonSelect
                  placeholder="Vui lòng chọn loại sản phẩm"
                  onSearch={onSearchProdCate}
                  fetchOnFirst
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
              <Form.Item name="price" label="Giá">
                <Input type="number" suffix="VND" />
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
        </Form>
      </Card>
    </PageContainer>
  );
};

export default CreateProduct;
