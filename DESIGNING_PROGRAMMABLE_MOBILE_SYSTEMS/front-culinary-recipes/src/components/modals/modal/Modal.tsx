import React from 'react';
import { CloseIcon } from '@/components/icons';
import styles from './Modal.module.scss';

export interface IModalProps {
  onClose: () => void;
  isModalOpen: boolean;
  isError?: boolean;
  onClearError?: () => void;
}

interface IModal extends IModalProps {
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<IModal> = ({ isModalOpen, onClose, title, children, isError, onClearError }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAnimationEnd = () => {
    if (isError && onClearError) {
      setTimeout(() => {
        onClearError();
      }, 1500);
    }
  };

  return (
    <div className={`${styles.modal}  ${isModalOpen ? styles.open : ''}`} onClick={handleOverlayClick}>
      <div className={`${styles.modalInner} ${isError ? styles.error : ''}`} onAnimationEnd={handleAnimationEnd}>
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          <CloseIcon />
        </button>

        <h2 className={styles.title}>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
