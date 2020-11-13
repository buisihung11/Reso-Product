import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ImageUploader = () => {
  const [fileList, updateFileList] = useState([]);
  const props = {
    fileList,
    beforeUpload: (file) => {
      if (file.type !== 'image/png') {
        message.error(`${file.name} is not a png file`);
      }
      return file.type === 'image/png';
    },
    onChange: (info) => {
      console.log(info.fileList);
      // file.status is empty when beforeUpload return false
      updateFileList(info.fileList.filter((file) => !!file.status));
    },
    onPreview: async (file) => {
      debugger;
      let src = file.url;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow.document.write(image.outerHTML);
    },
  };
  console.log('fileList', fileList);
  return (
    <Upload listType="picture-card" showUploadList={false} {...props}>
      Ảnh
    </Upload>
  );
};

export default ImageUploader;
