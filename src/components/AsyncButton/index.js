import React, { useState, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const AsyncButton = ({ onClick, title, ...btnProps }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    if (!onClick) return;
    setLoading(true);
    Promise.resolve(onClick()).finally(() => setLoading(false));
  };

  //   const renderChildren = React.Children.map(children, (button) => {
  //     if (isValidElement) {
  //       return React.cloneElement(button, { ...button.prop, onClick: handleClick, loading });
  //     }
  //     return button;
  //   });

  return (
    <Button {...btnProps} loading={loading} onClick={handleClick}>
      {title}
    </Button>
  );
};

AsyncButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AsyncButton;
