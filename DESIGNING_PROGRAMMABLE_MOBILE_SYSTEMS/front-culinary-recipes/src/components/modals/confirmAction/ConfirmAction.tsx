import React from 'react';
import Modal, { IModalProps } from '../modal/Modal';
import { Button } from '@/components/ui';
import { EButtonClass, EButtonSize, EButtonType } from '@/utils';
import styles from './ConfirmAction.module.scss';

interface IConfirmActionProps extends IModalProps {
  onConfirm: () => void;
  title: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmAction: React.FC<IConfirmActionProps> = ({
  isModalOpen,
  onClose,
  onConfirm,
  title,
  confirmText = 'Yes',
  cancelText = 'Cancel',
}) => {
  return (
    <Modal isModalOpen={isModalOpen} onClose={onClose} title={title}>
      <div className={styles.btns}>
        <Button
          text={confirmText}
          nameClass={EButtonClass.SEC}
          typeBtn={EButtonType.BUTTON}
          size={EButtonSize.LG}
          isLink={false}
          handle={onConfirm}
        />
        <Button
          text={cancelText}
          nameClass={EButtonClass.DEF}
          typeBtn={EButtonType.BUTTON}
          size={EButtonSize.LG}
          isLink={false}
          handle={onClose}
        />
      </div>
    </Modal>
  );
};

export default ConfirmAction;
