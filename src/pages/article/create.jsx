import ImageUploader from '@/components/ImageUploader/ImageUploader';
import { ARTICLE_TYPE_DATA } from '@/utils/constraints';
import { getCurrentStore, normFile } from '@/utils/utils';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, Radio, Row, Switch, Typography } from 'antd';
import React from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

const FormItem = Form.Item;

const CreateArticle = () => {
  const [form] = Form.useForm();
  return (
    <PageContainer>
      <Card bordered={false}>
        <Form
          layout="vertical"
          onFinish={(values) => console.log('Create Product', values)}
          name="create-article-form"
          form={form}
          initialValues={{ storeID: getCurrentStore() }}
        >
          <FormItem name="storeID" hidden />
          <Typography.Title level={3}>Thông tin bài viết</Typography.Title>
          <Button type="primary" htmlType="submit">
            Tạo
          </Button>
          <Row>
            <Col span={24}>
              <FormItem
                valuePropName="fileList"
                getValueFromEvent={normFile}
                name="imageThumbnail"
                label="Ảnh đại điện"
              >
                <ImageUploader style={{ height: '100%' }} />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <FormItem
                label="Tên bài viết"
                name="article_name"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên',
                  },
                ]}
              >
                <Input placeholder="Tên bài viết" />
              </FormItem>
            </Col>
            <Col xs={24} md={12}>
              <FormItem
                label="Kích hoạt"
                name="isAvailable"
                rules={[
                  {
                    // required: true,
                    message: 'Vui lòng chọn cửa hàng',
                  },
                ]}
              >
                <Switch />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <FormItem
                label="Link bài viết"
                name="link"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên',
                  },
                ]}
              >
                <Input placeholder="Tên bài viết" />
              </FormItem>
            </Col>
            <Col xs={24} md={12}>
              <FormItem
                label="Loại bài viết"
                name="type"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn loại bài viết',
                  },
                ]}
              >
                <Radio.Group options={ARTICLE_TYPE_DATA} />
              </FormItem>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <FormItem label="Mô tả" name="description">
                <Input.TextArea rows={4} />
              </FormItem>
            </Col>
            <Col xs={24} md={12}>
              <FormItem
                valuePropName="fileList"
                getValueFromEvent={normFile}
                name="pic_url"
                label="Ảnh"
              >
                <ImageUploader style={{ height: '100%' }} />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label="Nội dung bài viết" name="content_html">
                {/* <Input.TextArea rows={4} /> */}
                <ReactQuill />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageContainer>
  );
};

// CreateArticle.modules = {
//   toolbar: {
//     container: [['image']],
//     handlers: {
//       image: imageHandler,
//     },
//   },
// };

// function imageHandler() {
//   var range = this.quill.getSelection();
//   var value = prompt('What is the image URL');
//   this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
// }

export default CreateArticle;
