import React, { useEffect } from 'react';
import { EmailIcon, PasswordIcon } from '@/components/icons';
import { Button, Input } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schemaLogin from './schema';
import { EButtonClass, EButtonSize, EButtonType, EInputType } from '@/utils';
import { useAuth } from '@/api/hooks';
import styles from './LoginForm.module.scss';

interface ILoginForm {
  setError: (value: boolean) => void;
  setNotificationMessage: (msg: string, isSuccess: boolean) => void;
}

export interface ILoginInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC<ILoginForm> = ({ setError, setNotificationMessage }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ILoginInputs>({
    mode: 'onChange',
    resolver: yupResolver(schemaLogin),
  });

  const { handleAuth, isFail, notificationMsg } = useAuth({ onSuccess: undefined });

  useEffect(() => {
    if (notificationMsg) {
      setNotificationMessage(notificationMsg, !isFail);
      setError(isFail);
      if (!isFail) {
        reset();
      }
    }
  }, [isFail, notificationMsg]);

  const handleLogin = (data: ILoginInputs) => handleAuth(data, true);

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
      <Input
        type={EInputType.EMAIL}
        placeholder="Email"
        isRequired
        icon={<EmailIcon />}
        register={register}
        name="email"
        errors={errors}
      />
      <Input
        type={EInputType.PASSWORD}
        placeholder="Password"
        isRequired
        icon={<PasswordIcon />}
        register={register}
        name="password"
        errors={errors}
      />
      <div className={styles.btn}>
        <Button
          text="Login"
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

export default LoginForm;
