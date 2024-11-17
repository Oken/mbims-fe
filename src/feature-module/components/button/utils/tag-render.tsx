import React, { useContext } from 'react';
import { Tag } from 'antd';
import type { TagProps } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import PlainDelete from '../../../../style/icons/site-icons-component/plain-delete';
import { CustomTagRenderContext }  from './context/tagrender-context';

interface CustomTagRenderProps extends TagProps {
  label: React.ReactNode;
  value: string | number;
  closable: boolean;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
}

const TagRender = (props: CustomTagRenderProps) => {
  const { label, value, closable, onClose } = props;
  const context = useContext(CustomTagRenderContext);

  // console.log('CloseOutlined: ', CloseOutlined);

  if (!context) {
    throw new Error('TagRender must be used within a CustomTagRenderProvider');
  }

  const { customDelete, setCustomDelete } = context;

  // console.log('context: ', context, '\ncustomDelete: ', customDelete);

  return (
    <Tag
      color="#173F77"
      closable={closable}
      onClose={onClose}
      style={{
        borderRadius: '8px',
        padding: '4px 8px',
        fontWeight: 500,
        fontSize: '1.2em',
      }}
      closeIcon={
        customDelete ? <PlainDelete
          style={{ fontSize: '1em', paddingLeft: 5 }}
          onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
            e.stopPropagation();
            const evnt = e as unknown as React.MouseEvent<HTMLElement, MouseEvent>;
            if (onClose) onClose(evnt); // Trigger the onClose handler
          }}
        /> : <CloseOutlined style={{ fontSize: '1em', paddingLeft: 5 }} />
      }
    >
      {label}
    </Tag>
  )
}

// const TagRender = () => {
//   const context = useContext(CustomTagRenderContext);

//   console.log('context: ', context);

//   const value = context;

//   console.log('context value: ', value);

//   return (
//     <div>
//       {value}
//     </div>
//   )
// }

export default TagRender;
