import {  GetProp, message } from 'antd';
import type { UploadProps } from 'antd/es/upload';

// Types
export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

// Upload the image
export const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('Image must smaller than 5MB!');
  }

  // If this returns `true`, uploading becomes automatic
  // return isJpgOrPng && isLt2M;

  // Prevent automatic uploading (POST request if `action` attribute is used)
  return false;
};

// Custom upload button
export const uploadButton = (
  <button
    style={{ border: 0, background: 'none', width: '100%', height: '100%', position: 'relative' }}
    type="button"
  >
    {/* <FileImageOutlined /> */}
    {/* {loading ? <LoadingOutlined /> : <FileImageOutlined />} */}

    <span style={{ position: 'absolute', top: '25%', right: '50%', transform: 'translate(50%, 0)' }}>
      <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.33333 48C3.86667 48 2.61156 47.4782 1.568 46.4347C0.524445 45.3911 0.00177778 44.1351 0 42.6667V5.33333C0 3.86667 0.522667 2.61156 1.568 1.568C2.61333 0.524445 3.86844 0.00177778 5.33333 0H42.6667C44.1333 0 45.3893 0.522667 46.4347 1.568C47.48 2.61333 48.0018 3.86844 48 5.33333V42.6667C48 44.1333 47.4782 45.3893 46.4347 46.4347C45.3911 47.48 44.1351 48.0018 42.6667 48H5.33333ZM5.33333 42.6667H42.6667V5.33333H5.33333V42.6667ZM8 37.3333H40L30 24L22 34.6667L16 26.6667L8 37.3333Z"
          fill="#0D1821"
          fillOpacity="0.3"
        />
      </svg>
    </span>

    <p
      style={{
        position: 'absolute',
        bottom: '0',
        left: 0,
        right: 0,
        padding: '5px',
        fontSize: '12px',
        background: '#173F77',
        color: '#D5E5FC',
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
      }}
    >
      Choose Image
    </p>
  </button>
);

// Get the base 64 of the image
const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};