import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { ProfileForm } from '@/components/forms';
import { LogOutIcon } from '@/components/icons';
import Button from '@/components/ui/Button';
import { ChangePasswordModal, ConfirmAction } from '@/components/modals';
import { useDeleteAccount } from '@/api/hooks';
import { useLogout } from '@/hooks';
import { EButtonClass, EButtonSize, EButtonType, EUrls } from '@/utils';
import { router } from 'expo-router';

const ProfileContent: React.FC = () => {
  const [isModalChangePassOpen, setIsModalChangePassOpen] = useState<boolean>(false);
  const [isModalDelAccOpen, setIsModalDelAccOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  const { handleDeleteAccount, notificationMsg } = useDeleteAccount();
  const { handleLogout } = useLogout();

  const openModalChangePass = () => setIsModalChangePassOpen(true);
  const closeModalChangePass = () => setIsModalChangePassOpen(false);
  const openDelAcc = () => setIsModalDelAccOpen(true);
  const closeDelAcc = () => setIsModalDelAccOpen(false);
  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleConfirmLogout = async () => {
    try {
      const message = await handleLogout();
      Alert.alert('Logged out', message);
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert('Error', 'An error occurred during logout.');
    } finally {
      closeLogoutModal();
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await handleDeleteAccount();
      Alert.alert('Success', 'Your account successfully delete');
      setTimeout(() => router.push(EUrls.MAIN), 1000);
    } catch (error) {
      console.error('Delete acount failed:', error);
      Alert.alert('Error', notificationMsg);
    } finally {
      closeDelAcc();
    }
  };

  return (
    <View className="my-16 p-4">
      <Text className="font-playfairBold text-black text-5xl pb-7 border-b border-greyLight mb-16">Profile</Text>

      <View className="gap-y-8">
        <ProfileForm />

        <View className="flex-row justify-between mt-2">
          <Button
            text="Change Password"
            nameClass={EButtonClass.DEF}
            size={EButtonSize.SM}
            onPress={openModalChangePass}
          />
        </View>

        <View className="flex-row justify-between mt-2">
          <TouchableOpacity onPress={openLogoutModal} className="flex-row items-center gap-x-2">
            <LogOutIcon />
            <Text className="text-lg text-black">Sign out</Text>
          </TouchableOpacity>

          <Button text={'Delete Account'} nameClass={EButtonClass.DEF} size={EButtonSize.SM} onPress={openDelAcc} />
        </View>
      </View>

      <ChangePasswordModal isModalOpen={isModalChangePassOpen} onClose={closeModalChangePass} />

      <ConfirmAction
        isModalOpen={isModalDelAccOpen}
        onClose={closeDelAcc}
        onConfirm={handleConfirmDelete}
        title="Are you sure you want to delete your account?"
      />

      <ConfirmAction
        isModalOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        onConfirm={handleConfirmLogout}
        title="Are you sure you want to log out of your account?"
      />
    </View>
  );
};

export default ProfileContent;
