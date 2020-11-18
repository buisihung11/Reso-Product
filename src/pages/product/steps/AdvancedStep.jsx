import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Row, Col, Form, Divider, Tooltip, Select, Input } from 'antd';

import request from '@/utils/requestServer';
import CommonSelect from '@/components/CommonSelect/CommonSelect';

const onSearchCollection = (searchValue) => {
  return request.get(`/menus`);
};

const AdvancedStep = (props) => {
  return <div>Advanced Step</div>;
};

export default AdvancedStep;
