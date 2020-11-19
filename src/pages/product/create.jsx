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
import { createProduct } from '@/services/product';
import AsyncButton from '@/components/AsyncButton';
import { useHistory } from 'umi';

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
  const history = useHistory();
  const [productType, setProductType] = useState(null);
  const [formData, setFormData] = useState(null);

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Thông tin chính',
      content: () => <BasicStep onChangeProductType={setProductType} />,
    },
    {
      title: 'Chi tiết sản phẩm',
      content: () => <CombinationStep form={form} productType={productType} />,
    },
    {
      title: 'Cấu hình nâng cao',
      content: () => <AdvancedStep />,
    },
  ];

  // console.log('formData', formData);

  const onCreateProduct = () => {
    console.log(formData);
    return createProduct(formData).then(() => history.go(0));
  };

  // console.log('form', form.getFieldsValue());

  return (
    <PageContainer>
      <Form
        // onFinish={onCreateProduct}
        colon
        form={form}
        name="productInfo"
        layout="vertical"
        onValuesChange={(changedFileds, allValues) =>
          setFormData((prev) => ({ ...prev, ...allValues }))
        }
      >
        <Card bordered={false} style={{ width: '100%', marginBottom: '2em' }}>
          <Row>
            <Typography.Title level={3}>{steps[currentStep].title}</Typography.Title>
          </Row>
          <Row style={{ width: '100%' }}>{steps[currentStep].content()}</Row>
          <Row justify="end">
            {currentStep > 0 && (
              <Button
                style={{ margin: '0 8px' }}
                onClick={() => setCurrentStep((step) => step - 1)}
              >
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={() => setCurrentStep((step) => step + 1)}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <AsyncButton title="Tạo" type="primary" onClick={onCreateProduct} />
            )}
          </Row>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default CreateProduct;
