import React from 'react';
import { View } from 'react-native';
import CustomModal from './CustomModal';
import Button from '../ui/Button';
import { EButtonClass, EButtonSize } from '@/utils';

interface IConfirmActionProps {
  isModalOpen: boolean;
  onClose: () => void;
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
    <CustomModal isModalOpen={isModalOpen} onClose={onClose} title={title}>
      <View className="flex-row justify-between mt-4">
        <Button text={confirmText} nameClass={EButtonClass.SEC} size={EButtonSize.LG} onPress={onConfirm} />
        <Button text={cancelText} nameClass={EButtonClass.DEF} size={EButtonSize.LG} onPress={onClose} />
      </View>
    </CustomModal>
  );
};

export default ConfirmAction;
