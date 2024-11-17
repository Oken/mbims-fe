// CustomModal.tsx
import { useState, forwardRef, useImperativeHandle, ReactNode } from 'react';
import { Modal, ModalProps } from 'antd';
import './styles.scss';

interface CustomModalProps extends ModalProps {
  content?: ReactNode | JSX.Element;
  onOk?: () => void;
  onCancel?: () => void;
  width: string,
  children?: ReactNode;
}

export interface CustomModalRef {
  openModal: () => void;
  closeModal: () => void;
}

const CustomModal = forwardRef<CustomModalRef, CustomModalProps>(
  ({ content, onOk, onCancel, width, children, ...props }, ref) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      openModal: () => setIsModalOpen(true),
      closeModal: () => setIsModalOpen(false),
    }));

    const handleOk = () => {
      if (onOk) {
        onOk();
      }
      setIsModalOpen(false);
    };

    const handleCancel = () => {
      if (onCancel) {
        onCancel();
      }
      setIsModalOpen(false);
    };

    return (
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className={'customModal'}
        {...props}
        width={width}
      >
        {content ? content : children}
      </Modal>
    );
  },
);

export default CustomModal;
