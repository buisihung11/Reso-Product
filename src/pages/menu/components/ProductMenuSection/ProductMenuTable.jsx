import { EditOutlined, EyeOutlined, SettingOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Dropdown,
  Form,
  List,
  Modal,
  Row,
  Space,
  Switch,
  Table,
  Tooltip,
} from 'antd';
import React, { useReducer, useState } from 'react';
import ProductMenuModal from './ProductMenuModal';

const initState = {
  viewDetailVisible: false,
  currentProduct: null,
  updateMode: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'view-detail':
      return {
        ...state,
        currentProduct: action.payload.currentProduct,
        updateMode: false,
        viewDetailVisible: true,
      };
    case 'update-product-menu':
      return {
        ...state,
        currentProduct: action.payload.currentProduct,
        updateMode: true,
        viewDetailVisible: true,
      };
    case 'close-modal':
      return {
        ...state,
        viewDetailVisible: false,
        currentProduct: null,
        updateMode: false,
      };
    default:
      throw new Error();
  }
}

const ProductMenuTable = ({ tableProps, onUpdate }) => {
  const [{ viewDetailVisible, currentProduct, updateMode }, dispatch] = useReducer(
    reducer,
    initState,
  );

  const columns = [
    {
      title: 'Tên sản phẩm',
      width: 180,
      ellipsis: true,
      fixed: 'left',
      dataIndex: 'product_name',
    },
    {
      title: 'Giá 1',
      dataIndex: 'price1',
    },
    {
      title: 'Giá 2',
      dataIndex: 'price2',
    },
    {
      title: 'Giá cố định',
      dataIndex: 'price',
      render: (text) => <Switch disabled defaultChecked />,
    },
    {
      title: 'Hành động',
      width: 120,
      fixed: 'right',
      align: 'center',
      render: (text, prod) => (
        <>
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              onClick={() => {
                dispatch({
                  type: 'view-detail',
                  payload: {
                    currentProduct: prod,
                  },
                });
              }}
            />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Cập nhật">
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                dispatch({
                  type: 'update-product-menu',
                  payload: {
                    currentProduct: prod,
                  },
                });
              }}
              type="ghost"
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const columnCheckBox = () => {
    return (
      <List
        size="small"
        dataSource={columns}
        renderItem={(column, index) => (
          <List.Item>
            <Checkbox>{column.title}</Checkbox>
          </List.Item>
        )}
      />
    );
  };

  const onOkHandler = (prod) => {
    if (updateMode) {
      return Promise.resolve(onUpdate(prod));
    } else {
      dispatch({ type: 'close-modal' });
    }
  };

  console.log('currentProduct', currentProduct);

  return (
    <>
      {/* <Row justify="end">
        <Col>
          <Dropdown overlay={columnCheckBox()}>
            <SettingOutlined />
          </Dropdown>
        </Col>
      </Row> */}
      <ProductMenuModal
        updateMode={updateMode}
        product={currentProduct}
        visible={viewDetailVisible}
        onOk={onOkHandler}
        onCancel={() => dispatch({ type: 'close-modal' })}
      />
      <Table scroll={{ x: 600 }} rowKey="id" columns={columns} {...tableProps} />
    </>
  );
};

export default ProductMenuTable;
