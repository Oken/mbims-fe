/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { message } from 'antd';
import { getBase64 } from '../utils';

export const useImageUpload = () => {
  const [imgLoading, setImgLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setImgLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setImgLoading(false);
        setImageUrl(url);
        message.success('Image uploaded successfully');
      });
    }
  };

  imgLoading && message.loading('Image is uploading...');

  return { imageUrl, handleImageChange };
};
