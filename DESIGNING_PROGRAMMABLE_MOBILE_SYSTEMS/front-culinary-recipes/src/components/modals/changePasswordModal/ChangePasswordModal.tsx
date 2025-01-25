import React, { useState } from 'react';
import { ChangePasswordForm } from '@/components/forms';
import { IModalProps, Modal } from '..';
import { Notification } from '@/components/ui';

const ChangePasswordModal: React.FC<IModalProps> = ({ isModalOpen, onClose }) => {
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isNotificationSuccess, setIsNotificationSuccess] = useState(false);

  const handleSetNotificationMessage = (msg: string, isSuccess: boolean) => {
    setNotificationMessage(msg);
    setIsNotificationSuccess(isSuccess);
  };

  const handleClose = () => {
    onClose();
    setNotificationMessage('');
    setIsNotificationSuccess(false);
  };

  return (
    <>
      {notificationMessage && <Notification isSuccess={isNotificationSuccess} msg={notificationMessage} />}

      <Modal
        isModalOpen={isModalOpen}
        onClose={handleClose}
        title="Change Password"
        isError={isError}
        onClearError={() => {
          setIsError(false);
          setNotificationMessage('');
        }}
      >
        <ChangePasswordForm
          setError={setIsError}
          setNotificationMessage={handleSetNotificationMessage}
          onSuccess={() => {
            setTimeout(handleClose, 1500);
          }}
        />
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
