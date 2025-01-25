import React, { useEffect, useState } from 'react';
import { Button, Notification } from '@/components/ui';
import { Auth, ConfirmAction } from '@/components/modals';
import { SUCCESS_AUTH, EUrls, EButtonClass, EButtonSize, EButtonType } from '@/utils';
import { useAuthToken, useLogout } from '@/hooks';
import styles from './UserProfile.module.scss';
import { Link } from 'react-router-dom';
import ERoles from '@/utils/enums/roles';

const UserProfile: React.FC = () => {
  const { token, role } = useAuthToken();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [notification, setNotification] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: '',
  });

  const { isAuth, handleLogout } = useLogout();

  useEffect(() => {
    if (token && !isAuth) {
      setNotification({ isOpen: true, message: SUCCESS_AUTH });
    }
  }, [token, isAuth]);

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const toggleLogoutModal = () => setIsLogoutModalOpen((prev) => !prev);

  const handleLogOut = () => {
    const message = handleLogout();
    setNotification({ isOpen: true, message });
    setIsLogoutModalOpen(false);
    setIsModalOpen(false);
  };

  const renderProfileLinks = () => (
    <ul className={styles.dropdown}>
      <li>
        <Link to={EUrls.PROFILE}>Profile</Link>
      </li>
      {role === ERoles.ADMIN && (
        <>
          <li>
            <Link to={EUrls.ADMIN_USERS}>Admin Users</Link>
          </li>
          <li>
            <Link to={EUrls.ADMIN_ROLES}>Admin Roles</Link>
          </li>
        </>
      )}
      {role === ERoles.MODERATOR && (
        <>
          <li>
            <Link to={EUrls.MODERATOR_CATEGORIES}>Moderator Categories</Link>
          </li>
          <li>
            <Link to={EUrls.MODERATOR_RECIPES}>Moderator Recipes</Link>
          </li>
        </>
      )}
      {role === ERoles.USER && (
        <>
          <li>
            <Link to={EUrls.FAVORITES}>Favorites</Link>
          </li>
          <li>
            <a href={EUrls.PROFILE_RECIPES}>Recipes</a>
          </li>
        </>
      )}
      <li>
        <button type="button" onClick={toggleLogoutModal}>
          Logout
        </button>
      </li>
    </ul>
  );

  return (
    <div className={styles.userProfile}>
      {notification.isOpen && <Notification isSuccess={true} msg={notification.message} />}

      {isAuth ? (
        <div className={styles.avatar}>
          <img alt="Profile" src="/icons/profile.svg" width={32} height={32} />
          {renderProfileLinks()}
        </div>
      ) : (
        <>
          <Button
            text="Login"
            nameClass={EButtonClass.DEF}
            size={EButtonSize.SM}
            typeBtn={EButtonType.BUTTON}
            handle={toggleModal}
            isLink={false}
          />
          <Auth isModalOpen={isModalOpen} onClose={toggleModal} />
        </>
      )}

      <ConfirmAction
        title="Are you sure you want to log out of your account?"
        isModalOpen={isLogoutModalOpen}
        onClose={toggleLogoutModal}
        onConfirm={handleLogOut}
        confirmText="Yes"
        cancelText="Cancel"
      />
    </div>
  );
};

export default UserProfile;
