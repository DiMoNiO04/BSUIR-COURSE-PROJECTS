import React, { useEffect } from 'react';
import { EmailIcon, PasswordIcon, UserIcon } from '@/components/icons';
import { Button, Input } from '@/components/ui';
import { EButtonClass, EButtonSize, EButtonType, EInputType } from '@/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schemaSignUp from './schema';
import styles from './SignUpForm.module.scss';
import { useAuth } from '@/api/hooks';

interface ISignupForm {
  onSuccess: () => void;
  setError: (value: boolean) => void;
  setNotificationMessage: (msg: string, isSuccess: boolean) => void;
}

export interface ISignupInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC<ISignupForm> = ({ onSuccess, setError, setNotificationMessage }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ISignupInputs>({
    mode: 'onChange',
    resolver: yupResolver(schemaSignUp),
  });

  const { handleAuth, isFail, notificationMsg } = useAuth({ onSuccess });

  useEffect(() => {
    if (notificationMsg) {
      setNotificationMessage(notificationMsg, !isFail);
      if (!isFail) {
        reset();
      }
    }
    setError(isFail);
  }, [isFail, notificationMsg]);

  const handleRegistration = (data: ISignupInputs) => handleAuth(data, false);

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleRegistration)}>
      <Input
        type={EInputType.TEXT}
        placeholder="First Name"
        icon={<UserIcon />}
        isRequired={true}
        register={register}
        name="firstName"
        errors={errors}
      />

      <Input
        type={EInputType.TEXT}
        placeholder="Last Name"
        icon={<UserIcon />}
        isRequired={true}
        register={register}
        name="lastName"
        errors={errors}
      />

      <Input
        type={EInputType.EMAIL}
        placeholder="Email"
        isRequired={true}
        icon={<EmailIcon />}
        register={register}
        name="email"
        errors={errors}
      />

      <Input
        type={EInputType.PASSWORD}
        placeholder="Password"
        isRequired={true}
        icon={<PasswordIcon />}
        register={register}
        name="password"
        errors={errors}
      />

      <Input
        type={EInputType.PASSWORD}
        placeholder="Confirm Password"
        isRequired={true}
        icon={<PasswordIcon />}
        register={register}
        name="confirmPassword"
        errors={errors}
      />

      <div className={styles.btn}>
        <Button
          text="Sign Up"
          nameClass={EButtonClass.SEC}
          typeBtn={EButtonType.SUBMIT}
          size={EButtonSize.LG}
          isLink={false}
          isDisabled={!isValid}
        />
      </div>
    </form>
  );
};

export default SignupForm;
