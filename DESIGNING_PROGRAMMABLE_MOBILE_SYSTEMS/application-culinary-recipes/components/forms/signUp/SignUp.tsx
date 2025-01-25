import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/api/hooks';
import { EmailIcon, PasswordIcon, UserIcon } from '@/components/icons';
import { EButtonClass, EButtonSize, EUrls, EInputType } from '@/utils';
import { router } from 'expo-router';
import { Input } from '@/components/ui';
import Button from '@/components/ui/Button';
import schemaSignUp from './schema';

export interface ISignupInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ISignupInputs>({
    mode: 'onChange',
    resolver: yupResolver(schemaSignUp),
  });

  const { handleAuth, isFail, notificationMsg } = useAuth({ onSuccess: undefined });

  useEffect(() => {
    if (isFail && notificationMsg) {
      Alert.alert('Error registration', notificationMsg);
    }

    if (!isFail && notificationMsg) {
      reset();
      Alert.alert('Success registration', notificationMsg);
      setTimeout(() => {
        router.push(EUrls.LOGIN);
      }, 2000);
    }
  }, [isFail, notificationMsg, reset]);

  const handleRegistration = (data: ISignupInputs) => handleAuth(data, false);

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

      <Input
        type={EInputType.PASSWORD}
        placeholder="Confirm Password"
        isRequired={true}
        icon={<PasswordIcon />}
        control={control}
        name="confirmPassword"
        errors={errors}
      />

      <View className="mt-6">
        <Button
          text="Sign Up"
          nameClass={EButtonClass.SEC}
          size={EButtonSize.LG}
          isLink={false}
          isDisabled={!isValid}
          onPress={handleSubmit(handleRegistration)}
        />
      </View>
    </View>
  );
};

export default SignUpForm;
