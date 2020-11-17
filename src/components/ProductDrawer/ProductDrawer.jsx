import React, { useState } from 'react';

import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProductTable from '@/pages/menu/components/ProductMenuSection/ProductTable';

const { Option } = Select;

const ProductDrawer = ({ onAdd, btnTitle }) => {
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
        {btnTitle}
      </Button>

      <Drawer
        title="Chọn sản phẩm để thêm vào menu"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        destroyOnClose
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
  btnTitle: (
    <span>
      <PlusOutlined /> Thêm
    </span>
  ),
};

export default ProductDrawer;
