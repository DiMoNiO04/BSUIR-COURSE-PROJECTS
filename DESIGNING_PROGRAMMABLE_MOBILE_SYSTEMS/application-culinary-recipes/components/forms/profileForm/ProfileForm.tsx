import React, { useEffect, useState } from 'react';
import { View, Alert, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Loading } from '@/components/ui';
import Button from '@/components/ui/Button';
import { EmailIcon, UserIcon } from '@/components/icons';
import { EButtonClass, EButtonSize, EInputType } from '@/utils';
import { useGetUserInfo, useUpdateProfile } from '@/api/hooks';
import schemaProfile from './schema';

export interface IProfileInputs {
  firstName: string;
  lastName: string;
  email: string;
}

const ProfileForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IProfileInputs>({
    mode: 'onChange',
    resolver: yupResolver(schemaProfile),
  });

  const { data: userData, isLoading } = useGetUserInfo();
  const { handleUpdateUser, isError: isUpdateError, notificationMsg } = useUpdateProfile();

  const [notification, setNotification] = useState<{ isSuccess: boolean; msg: string } | null>(null);

  useEffect(() => {
    if (userData) {
      reset({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
      });
    }
  }, [userData, reset]);

  useEffect(() => {
    if (notificationMsg) {
      setNotification({ isSuccess: !isUpdateError, msg: notificationMsg });
    }
  }, [isUpdateError, notificationMsg]);

  useEffect(() => {
    if (notification) {
      Alert.alert(notification.isSuccess ? 'Success' : 'Error', notification.msg);
    }
  }, [notification]);

  const onSubmit = async (data: IProfileInputs) => {
    await handleUpdateUser(data.firstName, data.lastName);
  };

  if (isLoading && !userData) return <Loading />;

  return (
    <View className="flex flex-col gap-y-6">
      <Input
        type={EInputType.TEXT}
        placeholder="First Name"
        icon={<UserIcon />}
        isRequired={true}
        control={control}
        name="firstName"
        errors={errors}
      />

      <Input
        type={EInputType.TEXT}
        placeholder="Last Name"
        icon={<UserIcon />}
        isRequired={true}
        control={control}
        name="lastName"
        errors={errors}
      />

      <Input
        type={EInputType.EMAIL}
        placeholder="Email"
        icon={<EmailIcon />}
        isReadonly={true}
        isRequired={true}
        control={control}
        name="email"
        errors={errors}
      />

      <View className="mt-4">
        <Button
          text="Save"
          nameClass={EButtonClass.SEC}
          size={EButtonSize.LG}
          isLink={false}
          isDisabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default ProfileForm;
