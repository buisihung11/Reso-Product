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
  message,
} from 'antd';

import BasicStep from './steps/BasicStep';
import AdvancedStep from './steps/AdvancedStep';
import CombinationStep from './steps/CombinationStep';

const onSearchCollection = (searchValue) => {
  return request.get(`/menus`);
};

const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const CreateProduct = (props) => {
  const [form] = Form.useForm();
  const [productType, setProductType] = useState(null);

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Thông tin chính',
      content: () => <BasicStep onChangeProductType={setProductType} />,
    },
    {
      title: 'Chi tiết sản phẩm',
      content: () => <CombinationStep productType={productType} />,
    },
    {
      title: 'Cấu hình nâng cao',
      content: <AdvancedStep form={form} />,
    },
  ];

  console.log('productType', productType);

  return (
    <PageContainer>
      <Form
        onFinish={(values) => console.log('Create Product', values)}
        colon
        form={form}
        name="productInfo"
        layout="vertical"
        // onFieldsChange={(changedFileds) => console.log('changedFields', changedFileds)}
      >
        <Card bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
          <Row>
            <Typography.Title level={3}>{steps[currentStep].title}</Typography.Title>
          </Row>
          <Row>{steps[currentStep].content()}</Row>
          <Row>
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={() => setCurrentStep((step) => step + 1)}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('Processing complete!')}>
                Done
              </Button>
            )}
            {currentStep > 0 && (
              <Button
                style={{ margin: '0 8px' }}
                onClick={() => setCurrentStep((step) => step - 1)}
              >
                Previous
              </Button>
            )}
          </Row>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default CreateProduct;
