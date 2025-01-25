import React, { useEffect } from 'react';
import { PasswordIcon } from '@/components/icons';
import { Button, Input } from '@/components/ui';
import { EButtonClass, EButtonSize, EButtonType, EInputType } from '@/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaChangePassword } from './schema';
import { useChangePassword } from '@/api/hooks';

interface IChangePasswordInputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface IChangePasswordFormProps {
  setError: (value: boolean) => void;
  setNotificationMessage: (msg: string, isSuccess: boolean) => void;
  onSuccess: () => void;
}

const ChangePasswordForm: React.FC<IChangePasswordFormProps> = ({ setError, setNotificationMessage, onSuccess }) => {
  const { handleChangePassword, isError, notificationMsg } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IChangePasswordInputs>({
    mode: 'onChange',
    resolver: yupResolver(schemaChangePassword),
  });

  useEffect(() => {
    if (notificationMsg) {
      setNotificationMessage(notificationMsg, !isError);
      setError(isError);
      if (!isError) {
        reset();
        onSuccess();
      }
    }
  }, [isError, notificationMsg]);

  const handleChangePasswordSubmit = async (data: IChangePasswordInputs) => {
    const { currentPassword, newPassword, confirmPassword } = data;
    await handleChangePassword(currentPassword, newPassword, confirmPassword);
  };

  return (
    <form onSubmit={handleSubmit(handleChangePasswordSubmit)}>
      <Input
        type={EInputType.PASSWORD}
        placeholder="Current Password"
        isRequired={true}
        icon={<PasswordIcon />}
        register={register}
        name="currentPassword"
        errors={errors}
      />

      <Input
        type={EInputType.PASSWORD}
        placeholder="New Password"
        isRequired={true}
        icon={<PasswordIcon />}
        register={register}
        name="newPassword"
        errors={errors}
      />

      <Input
        type={EInputType.PASSWORD}
        placeholder="Confirm New Password"
        isRequired={true}
        icon={<PasswordIcon />}
        register={register}
        name="confirmPassword"
        errors={errors}
      />

      <div className="flexCenter">
        <Button
          text="Save"
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

export default ChangePasswordForm;
