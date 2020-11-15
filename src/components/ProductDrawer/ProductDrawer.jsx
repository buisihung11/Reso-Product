import React, { useState } from 'react';

import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProductTable from '@/pages/menu/components/ProductMenuSection/ProductTable';

const { Option } = Select;

const ProductDrawer = ({ onAdd }) => {
  const [visible, setVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [adding, setAdding] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const addProductHadnler = () => {
    setAdding(true);
    Promise.resolve(onAdd(selectedProducts)).then(() => {
      setAdding(false);
      setVisible(false);
    });
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <PlusOutlined /> Thêm sản phẩm vào menu
      </Button>
      <Drawer
        title="Chọn sản phẩm để thêm vào menu"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button loading={adding} onClick={addProductHadnler} type="primary">
              Thêm {selectedProducts && selectedProducts.length}
            </Button>
          </div>
        }
      >
        <ProductTable
          onRowSelection={(_, selectedProducts) => setSelectedProducts(selectedProducts)}
        />
      </Drawer>
    </>
  );
};

ProductDrawer.defaultProps = {
  onAdd: () => null,
};

export default ProductDrawer;
