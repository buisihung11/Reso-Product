import ProductDrawer from '@/components/ProductDrawer/ProductDrawer';
import { getTableData } from '@/services/table';
import { buildParams } from '@/utils/utils';
import { useFormTable } from '@umijs/hooks';
import { Typography, Row, Col, Form } from 'antd';
import ProductMenuTable from './ProductMenuTable';
import React, { useEffect } from 'react';

const ProductMenuSection = ({ menuId }) => {
  const [form] = Form.useForm();

  const { tableProps, search, sorter } = useFormTable(
    ({ current, pageSize, sorter: s, filters }, formData) => {
      // build filters
      const options = {
        params: buildParams({ current, pageSize }, s, formData),
      };
      return getTableData(`menus/${menuId}/products`, options);
    },
    {
      defaultPageSize: 10,
      defaultParams: [
        {
          current: 1,
          pageSize: 10,
        },
      ],
      form,
      paginated: true,
    },
  );

  const { submit: refetch } = search || {};

  useEffect(() => {
    // fetch data from updateId
    form.setFieldsValue();
  }, [menuId]);

  const handleAddNew = (prods) => {
    // call search to re-fetch Data
    refetch();
  };

  const handleUpdate = (prods) => {
    // call search to re-fetch Data
    // return promise
  };

  return (
    <>
      <Row justify="space-between">
        <Col>
          <Typography.Title level={4}>Sản phẩm trong Menu</Typography.Title>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <ProductDrawer onAdd={handleAddNew} />
        </Col>
      </Row>
      <ProductMenuTable tableProps={tableProps} onUpdate={handleUpdate} />
    </>
  );
};

export default ProductMenuSection;
