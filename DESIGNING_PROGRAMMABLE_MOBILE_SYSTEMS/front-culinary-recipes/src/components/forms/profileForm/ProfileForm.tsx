import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Notification } from '@/components/ui';
import { EmailIcon, UserIcon } from '@/components/icons';
import { EButtonClass, EButtonSize, EButtonType, EInputType } from '@/utils';
import styles from './ProfileForm.module.scss';
import schemaProfile from './schema';
import { useGetUserInfo, useUpdateProfile } from '@/api/hooks';

export interface IProfileInputs {
  firstName: string;
  lastName: string;
  email: string;
}

const ProfileForm: React.FC = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileInputs>({
    mode: 'onChange',
    resolver: yupResolver(schemaProfile),
  });

  const { data: userData, isLoading } = useGetUserInfo();
  const { handleUpdateUser, isError: isUpdateError, notificationMsg } = useUpdateProfile();

  const [notification, setNotification] = useState<{ isSuccess: boolean; msg: string } | null>(null);

  useEffect(() => {
    if (userData) {
      setValue('firstName', userData.firstName || '');
      setValue('lastName', userData.lastName || '');
      setValue('email', userData.email || '');
    }
  }, [userData, setValue]);

  useEffect(() => {
    if (notificationMsg) {
      setNotification({ isSuccess: !isUpdateError, msg: notificationMsg });
    }
  }, [isUpdateError, notificationMsg]);

  const onSubmit = async (data: IProfileInputs) => {
    await handleUpdateUser(data.firstName, data.lastName);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
          icon={<EmailIcon />}
          isReadonly={true}
          isRequired={true}
          placeholder="Email"
          register={register}
          name="email"
          errors={errors}
        />

        <Button
          text="SAVE"
          nameClass={EButtonClass.SEC}
          typeBtn={EButtonType.SUBMIT}
          size={EButtonSize.SM}
          isLink={false}
          handle={handleSubmit(onSubmit)}
          customClass={styles.btnSubmit}
        />
      </form>

      {notification && <Notification isSuccess={notification.isSuccess} msg={notification.msg} />}
    </>
  );
};

export default ProfileForm;
