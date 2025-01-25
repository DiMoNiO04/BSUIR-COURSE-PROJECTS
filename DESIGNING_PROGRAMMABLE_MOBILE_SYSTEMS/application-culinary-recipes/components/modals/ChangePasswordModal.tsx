import React from 'react';
import { ChangePasswordForm } from '../forms';
import CustomModal from './CustomModal';

interface IChangePasswordModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<IChangePasswordModalProps> = ({ isModalOpen, onClose }) => {
  return (
    <CustomModal isModalOpen={isModalOpen} onClose={onClose} title="Change Password">
      <ChangePasswordForm />
    </CustomModal>
  );
};

export default ChangePasswordModal;
