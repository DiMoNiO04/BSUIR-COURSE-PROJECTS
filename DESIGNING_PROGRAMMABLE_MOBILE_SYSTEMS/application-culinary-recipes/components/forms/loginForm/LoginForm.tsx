import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schemaLogin from './schema';
import { useAuth } from '@/api/hooks';
import { EmailIcon, PasswordIcon } from '@/components/icons';
import { EButtonClass, EButtonSize, EUrls, EInputType } from '@/utils';
import { router } from 'expo-router';
import { Input } from '@/components/ui';
import Button from '@/components/ui/Button';

export interface ILoginInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ILoginInputs>({
    mode: 'onChange',
    resolver: yupResolver(schemaLogin),
  });

  const { handleAuth, isFail, notificationMsg } = useAuth({ onSuccess: undefined });

  useEffect(() => {
    if (isFail && notificationMsg) {
      Alert.alert('Error auth', notificationMsg);
    }

    if (!isFail && notificationMsg) {
      reset();
      router.push(EUrls.MAIN);
    }
  }, [isFail, notificationMsg, reset]);

  const handleLogin = (data: ILoginInputs) => handleAuth(data, true);

  return (
    <View className="flex flex-col gap-y-6">
      <Input
        type={EInputType.EMAIL}
        placeholder="Email"
        icon={<EmailIcon />}
        control={control}
        name="email"
        errors={errors}
      />

      <Input
        type={EInputType.PASSWORD}
        placeholder="Password"
        icon={<PasswordIcon />}
        control={control}
        name="password"
        errors={errors}
      />

      <View className="mt-6">
        <Button
          text="Login"
          nameClass={EButtonClass.SEC}
          size={EButtonSize.LG}
          isLink={false}
          isDisabled={!isValid}
          onPress={handleSubmit(handleLogin)}
        />
      </View>
    </View>
  );
};

export default LoginForm;
