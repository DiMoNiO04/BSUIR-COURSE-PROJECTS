import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useChangePassword } from '@/api/hooks';
import { PasswordIcon } from '@/components/icons';
import { EButtonClass, EButtonSize, EInputType } from '@/utils';
import { Input } from '@/components/ui';
import Button from '@/components/ui/Button';
import { schemaChangePassword } from './schema';

export interface IChangePasswordInputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IChangePasswordInputs>({
    mode: 'onChange',
    resolver: yupResolver(schemaChangePassword),
  });

  const { handleChangePassword, isError, notificationMsg } = useChangePassword();

  useEffect(() => {
    if (notificationMsg) {
      Alert.alert(isError ? 'Error' : 'Success', notificationMsg);
      if (!isError) {
        reset();
      }
    }
  }, [isError, notificationMsg, reset]);

  const handleChangePasswordSubmit = async (data: IChangePasswordInputs) => {
    const { currentPassword, newPassword, confirmPassword } = data;
    await handleChangePassword(currentPassword, newPassword, confirmPassword);
  };

  return (
    <View className="flex flex-col gap-y-6">
      <Input
        type={EInputType.PASSWORD}
        placeholder="Current Password"
        isRequired={true}
        icon={<PasswordIcon />}
        control={control}
        name="currentPassword"
        errors={errors}
      />

      <Input
        type={EInputType.PASSWORD}
        placeholder="New Password"
        isRequired={true}
        icon={<PasswordIcon />}
        control={control}
        name="newPassword"
        errors={errors}
      />

      <Input
        type={EInputType.PASSWORD}
        placeholder="Confirm New Password"
        isRequired={true}
        icon={<PasswordIcon />}
        control={control}
        name="confirmPassword"
        errors={errors}
      />

      <View className="mt-6">
        <Button
          text="Save"
          nameClass={EButtonClass.SEC}
          size={EButtonSize.LG}
          isLink={false}
          isDisabled={!isValid}
          onPress={handleSubmit(handleChangePasswordSubmit)}
        />
      </View>
    </View>
  );
};

export default ChangePasswordForm;
