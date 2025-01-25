import React, { useState } from 'react';
import { Button, Notification } from '@/components/ui';
import { LogOutIcon } from '@/components/icons';
import { ProfileForm } from '@/components/forms';
import { ChangePasswordModal, ConfirmAction } from '@/components/modals';
import { useDeleteAccount } from '@/api/hooks';
import { useLogout } from '@/hooks';
import { EButtonClass, EButtonSize, EButtonType } from '@/utils';
import styles from './ProfileContent.module.scss';

const ProfileContent: React.FC = () => {
  const [isModalChangePassOpen, setIsModalChangePassOpen] = useState<boolean>(false);
  const [isModalDelAccOpen, setIsModalDelAccOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  const { handleDeleteAccount, notificationMsg, isError } = useDeleteAccount();
  const { handleLogout } = useLogout();

  const openModalChangePass = () => setIsModalChangePassOpen(true);
  const closeModalChangePass = () => setIsModalChangePassOpen(false);
  const openDelAcc = () => setIsModalDelAccOpen(true);
  const closeDelAcc = () => setIsModalDelAccOpen(false);
  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleConfirmLogout = () => {
    handleLogout();
    closeLogoutModal();
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>Profile</h1>

        <div className={styles.content}>
          <div className={styles.form}>
            <ProfileForm />
            <div className={styles.passBtn}>
              <Button
                text="Change Password"
                nameClass={EButtonClass.DEF}
                typeBtn={EButtonType.BUTTON}
                size={EButtonSize.SM}
                isLink={false}
                handle={openModalChangePass}
              />
            </div>
          </div>

          <div className={styles.out}>
            <button type={EButtonType.BUTTON} className={styles.logOut} onClick={openLogoutModal}>
              <LogOutIcon />
              Sign out
            </button>
            <button type={EButtonType.BUTTON} className={styles.delete} onClick={openDelAcc}>
              Delete Account
            </button>
          </div>
        </div>
      </div>

      <ChangePasswordModal isModalOpen={isModalChangePassOpen} onClose={closeModalChangePass} />
      <ConfirmAction
        isModalOpen={isModalDelAccOpen}
        onClose={closeDelAcc}
        onConfirm={handleDeleteAccount}
        title="Are you sure you want to delete your account?"
      />
      <ConfirmAction
        isModalOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        onConfirm={handleConfirmLogout}
        title="Are you sure you want to log out of your account?"
      />

      {notificationMsg && <Notification isSuccess={!isError} msg={notificationMsg} />}
    </section>
  );
};

export default ProfileContent;
