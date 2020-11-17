import ProductDrawer from '@/components/ProductDrawer/ProductDrawer';
import { getTableData2 } from '@/services/table';
import { buildParams, getCurrentStore } from '@/utils/utils';
import { useFormTable } from '@umijs/hooks';
import { Typography, Row, Col, Form } from 'antd';
import ProductMenuTable from './ProductMenuTable';
import React, { useEffect } from 'react';
import { addProductIntoMenu, updateProductInMenu } from '@/services/menu';

const ProductMenuSection = ({ menuId }) => {
  const [form] = Form.useForm();
  const currentStoreID = getCurrentStore();

  const { tableProps, search, sorter } = useFormTable(
    ({ current, pageSize, sorter: s, filters }, formData) => {
      // build filters
      const options = {
        params: buildParams({ current, pageSize }, s, formData),
      };
      return getTableData2(`stores/${currentStoreID}/menus/${menuId}`, options);
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
    console.log('prods', prods);

    const prodsData = { ...prods[0], product_in_menu_id: null };

    return addProductIntoMenu(prodsData, currentStoreID, menuId).then(refetch);
  };

  const handleUpdate = (prod) => {
    // call search to re-fetch Data
    // return promise
    console.log('Update', prod);
    return updateProductInMenu(prod, currentStoreID, menuId);
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
