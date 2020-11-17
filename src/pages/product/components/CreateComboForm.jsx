import ProductDrawer from '@/components/ProductDrawer/ProductDrawer';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Space, Input, Button, Switch, Typography, Row, Col } from 'antd';
import React from 'react';

const CreateComboForm = ({ form }) => {
  const handleAddProductInMenu = (selectedProds, addCb, field) => {
    const nameGroupPath = ['groups', field.name, 'product_childs'];
    const addedProduct = form.getFieldValue(nameGroupPath) || [];
    // console.log('addedProduct', addedProduct);
    // const newProducts = selectedProds.map((prod) => ({ ...prod, defaultMinmax: 2 }));
    // form.setFieldsValue({ nameGroupPath: [...addedProduct, ...newProducts] });
    // console.log('form.getFieldsValue', form.getFieldsValue());
    selectedProds.forEach((prod) => {
      if (!addedProduct.some((p) => p.product_id === prod.product_id))
        addCb({ ...prod, defaultMinmax: 2 });
    });
  };

  return (
    <div>
      <Form.List name="groups">
        {(fields, { add, remove }) => (
          <Space direction="vertical" style={{ width: '100%' }}>
            {fields.map((field, index) => {
              console.log('field', field);
              return (
                <>
                  <Space
                    align="baseline"
                    style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                  >
                    <Typography.Title level={5}>{`Group ${index + 1}`}</Typography.Title>{' '}
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                  <Row gutter={8}>
                    <Col span={12}>
                      <Form.Item
                        {...field}
                        label="Số lượng sản phẩm trong nhóm"
                        name={[field.name, 'quantity']}
                        fieldKey={[field.fieldKey, 'quantity']}
                        // rules={[{ required: true, message: 'Missing first name' }]}
                      >
                        <Input type="number" placeholder="First Name" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...field}
                        label="Nhóm kết họp"
                        name={[field.name, 'isAnd']}
                        valuePropName="checkbox"
                        fieldKey={[field.fieldKey, 'isAnd']}
                      >
                        <Switch />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.List
                    name={[field.name, 'product_childs']}
                    fieldKey={[field.fieldKey, 'product_childs']}
                  >
                    {(productChildFields, { add: addProdChild, remove: removeProdChild }) => {
                      return (
                        <div style={{ padding: '0 10px' }}>
                          {productChildFields.map((prodChildField) => (
                            <>
                              <Row gutter={8}>
                                <Col span={12}>
                                  <Form.Item
                                    {...prodChildField}
                                    label="Tên sản phẩm"
                                    name={[prodChildField.name, 'product_name']}
                                    fieldKey={[prodChildField.fieldKey, 'product_name']}
                                    // rules={[{ required: true, message: 'Missing first name' }]}
                                  >
                                    <Input placeholder="First Name" readOnly />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    {...prodChildField}
                                    label="Default Min Max"
                                    name={[prodChildField.name, 'defaultMinmax']}
                                    fieldKey={[prodChildField.fieldKey, 'defaultMinmax']}
                                  >
                                    <Input type="number" />
                                  </Form.Item>
                                </Col>
                              </Row>
                            </>
                          ))}
                          <ProductDrawer
                            onAdd={(seletedProds) =>
                              handleAddProductInMenu(seletedProds, addProdChild, field)
                            }
                            btnTitle={
                              <span>
                                <PlusOutlined /> Thêm sản phẩm vào nhóm
                              </span>
                            }
                          />
                        </div>
                      );
                    }}
                  </Form.List>
                </>
              );
            })}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add({ quantity: 2, isAnd: false })}
                block
                icon={<PlusOutlined />}
              >
                Thêm nhóm
              </Button>
            </Form.Item>
          </Space>
        )}
      </Form.List>
    </div>
  );
};

export default CreateComboForm;
