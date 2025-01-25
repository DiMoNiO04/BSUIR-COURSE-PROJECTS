import React, { useState, useEffect } from 'react';
import { ConfirmAction } from '@/components/modals';
import styles from './UserCard.module.scss';
import { IUser, IRole } from '@/api';
import { useAssignRole, useBanUser, useGetRoles } from '@/api/hooks';
import { Button, Notification } from '@/components/ui';
import { EButtonClass, EButtonSize, EButtonType } from '@/utils';

const UserCard: React.FC<IUser> = ({ id, firstName, lastName, email, recipes, roles, bannedId, bannedUser }) => {
  const [banReason, setBanReason] = useState('');
  const [newRole, setNewRole] = useState<IRole>(roles[0]);
  const [isBanned, setIsBanned] = useState(Boolean(bannedId));
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const { data: availableRoles, isError: rolesError } = useGetRoles();
  const { handleAssignRole, isError, notificationMsg: roleNotification } = useAssignRole();
  const { handleBanUser, isError: banError, notificationMsg: banNotification } = useBanUser();

  useEffect(() => {
    if (roleNotification) {
      setNotificationMsg(roleNotification);
    }
  }, [roleNotification]);

  useEffect(() => {
    if (banNotification) {
      setNotificationMsg(banNotification);
    }
  }, [banNotification]);

  useEffect(() => {
    if (notificationMsg) {
      const timer = setTimeout(() => {
        setNotificationMsg(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notificationMsg]);

  const openBanModal = () => setIsBanModalOpen(true);
  const closeBanModal = () => setIsBanModalOpen(false);

  const openRoleModal = () => setIsRoleModalOpen(true);
  const closeRoleModal = () => setIsRoleModalOpen(false);

  const handleConfirmBan = async () => {
    await handleBanUser(id, banReason, !isBanned);
    setIsBanned(!isBanned);
    closeBanModal();
  };

  const handleConfirmRoleChange = async () => {
    try {
      await handleAssignRole(id, newRole.id);
      setNotificationMsg(roleNotification);
    } catch (error) {
      setNotificationMsg(roleNotification);
    }
    closeRoleModal();
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = availableRoles?.find((role) => role.id === Number(e.target.value));
    if (selectedRole) {
      setNewRole(selectedRole);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.infoBlock}>
          <b>First Name:</b> {firstName}
        </div>
        <div className={styles.infoBlock}>
          <b>Last Name:</b> {lastName}
        </div>
        <div className={styles.infoBlock}>
          <b>Email:</b> {email}
        </div>
        <div className={styles.infoBlock}>
          <b>Count recipes:</b> {recipes.length}
        </div>
        <div className={styles.infoBlock}>
          <b>Role:</b> {roles[0].value}
        </div>
        {isBanned && (
          <div className={styles.infoBlock}>
            <b>Reason Ban:</b> {bannedUser?.reason || banReason}
          </div>
        )}
      </div>

      <div className={styles.actions}>
        {!isBanned ? (
          <div className={styles.banSection}>
            <input
              type="text"
              placeholder="Enter ban reason"
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              className={styles.banInput}
            />
            <Button
              text="Ban User"
              nameClass={EButtonClass.SEC}
              typeBtn={EButtonType.BUTTON}
              size={EButtonSize.SM}
              isLink={false}
              handle={openBanModal}
            />
          </div>
        ) : (
          <Button
            text="Unban User"
            nameClass={EButtonClass.SEC}
            typeBtn={EButtonType.BUTTON}
            size={EButtonSize.SM}
            isLink={false}
            handle={openBanModal}
          />
        )}

        <div className={styles.roleSection}>
          {availableRoles ? (
            <select value={newRole.id} onChange={handleRoleChange} className={styles.roleSelect}>
              {availableRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.value}
                </option>
              ))}
            </select>
          ) : rolesError ? (
            <p className={styles.error}>Error loading roles</p>
          ) : (
            <p>Loading roles...</p>
          )}
          <Button
            text="Change Role"
            nameClass={EButtonClass.DEF}
            typeBtn={EButtonType.BUTTON}
            size={EButtonSize.SM}
            isLink={false}
            handle={openRoleModal}
          />
        </div>
      </div>

      {notificationMsg && <Notification isSuccess={!isError && !banError} msg={notificationMsg} />}

      <ConfirmAction
        isModalOpen={isBanModalOpen}
        onClose={closeBanModal}
        onConfirm={handleConfirmBan}
        title={isBanned ? 'Are you sure you want to unban this user?' : 'Are you sure you want to ban this user?'}
      />

      <ConfirmAction
        isModalOpen={isRoleModalOpen}
        onClose={closeRoleModal}
        onConfirm={handleConfirmRoleChange}
        title={`Are you sure you want to change the role to "${newRole.value}"?`}
      />
    </div>
  );
};

export default UserCard;
