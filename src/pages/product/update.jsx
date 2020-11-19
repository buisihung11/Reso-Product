import React, { useState } from 'react';

import request from '@/utils/requestServer';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Typography, Row, Col, Button } from 'antd';

import { createProduct, updateProduct } from '@/services/product';
import AsyncButton from '@/components/AsyncButton';
import { useHistory } from 'umi';
import BasicStep from './steps/BasicStep';
import CombinationStep from './steps/CombinationStep';
import AdvancedStep from './steps/AdvancedStep';
import { normalizeImg } from '@/utils/utils';

const UpdateProduct = (props) => {
  console.log('update props', props);
  const {
    history: {
      location: { state: updateProductState },
    },
  } = props;
  const [form] = Form.useForm();
  const history = useHistory();
  const [productType, setProductType] = useState(null);
  const [formData, setFormData] = useState(updateProductState);

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Thông tin chính',
      content: () => <BasicStep updateMode onChangeProductType={setProductType} />,
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

  const onUpdateProduct = () => {
    const update = { ...formData };
    update.size =
      formData.size != null && Array.isArray(formData.size) ? formData.size.join(',') : null;
    update.base =
      formData.base != null && Array.isArray(formData.base) ? formData.base.join(',') : null;
    console.log('update', update);

    update.pic_url = formData.pic_url != null && Array.isArray(formData.pic_url) ? normalizeImg(formData.pic_url) : formData.pic_url;

    return updateProduct(updateProductState.product_id, {
      ...update,
      attributes: update.attributes || [],
    });
  };

  // console.log('form', form.getFieldsValue());

  return (
    <PageContainer>
      <Form
        // onFinish={onCreateProduct}
        initialValues={updateProductState}
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
                Quay lại
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={() => setCurrentStep((step) => step + 1)}>
                Tiếp theo
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <AsyncButton title="Cập nhật" type="primary" onClick={onUpdateProduct} />
            )}
          </Row>
        </Card>
      </Form>
    </PageContainer>
  );
};

export default UpdateProduct;
