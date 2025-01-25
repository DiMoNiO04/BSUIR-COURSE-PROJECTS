import React, { useState } from 'react';
import { LoginForm, SignupForm } from '@/components/forms';
import { IModalProps, Modal } from '..';
import { Notification } from '@/components/ui';
import { SUCCESS_REG } from '@/utils';
import styles from './Auth.module.scss';

const Auth: React.FC<IModalProps> = ({ onClose, isModalOpen }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isError, setIsError] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isNotificationSuccess, setIsNotificationSuccess] = useState(false);
  const [isSuccessReg, setIsSuccessReg] = useState(false);

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
      {isSuccessReg && <Notification isSuccess={true} msg={SUCCESS_REG} />}

      <Modal
        isModalOpen={isModalOpen}
        onClose={handleClose}
        title={isLogin ? 'LOGIN' : 'SIGN UP'}
        isError={isError}
        onClearError={() => {
          setIsError(false);
          setNotificationMessage('');
        }}
      >
        {isLogin ? (
          <LoginForm setError={setIsError} setNotificationMessage={handleSetNotificationMessage} />
        ) : (
          <SignupForm
            onSuccess={() => {
              setIsLogin(true);
              setIsSuccessReg(true);
            }}
            setError={setIsError}
            setNotificationMessage={handleSetNotificationMessage}
          />
        )}

        <div className={styles.analog}>
          {isLogin ? (
            <>
              Don’t have an account?
              <button type="button" onClick={() => setIsLogin(false)}>
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?
              <button type="button" onClick={() => setIsLogin(true)}>
                Login
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Auth;
