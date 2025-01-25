import React, { useEffect, useState } from 'react';
import { Button, Input, Textarea, Notification, Loading, ErrorFetch } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EActionType, EButtonClass, EButtonSize, EButtonType, EInputType, EUrls } from '@/utils';
import { useGetRole, useRole } from '@/api/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './RoleForm.module.scss';
import schemaRole from './schema';

export interface IRoleInputs {
  value: string;
  description: string;
}

interface IRoleForm {
  actionType: EActionType;
}

const RoleForm: React.FC<IRoleForm> = ({ actionType }) => {
  const navigate = useNavigate();
  const { value } = useParams<{ value: string }>();
  const { data: roleData, isLoading } = useGetRole(value ? String(value) : undefined);
  const isEditMode = actionType === EActionType.UPDATE;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IRoleInputs>({
    mode: 'onChange',
    resolver: yupResolver(schemaRole),
    defaultValues: roleData || {},
  });

  const { submitRole, notificationMsg, isError } = useRole(actionType, roleData?.id);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationMsgState, setNotificationMsgState] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (roleData) {
      reset(roleData);
    }
  }, [roleData, reset]);

  useEffect(() => {
    if (notificationMsg) {
      setNotificationMsgState(notificationMsg);
      setIsNotificationVisible(true);

      if (!isError) {
        setIsSuccess(true);
        const timer = setTimeout(() => {
          reset();
          navigate(EUrls.ADMIN_ROLES);
        }, 1500);
        return () => clearTimeout(timer);
      } else {
        setIsSuccess(false);
      }
    }
  }, [notificationMsg, reset, navigate, isError]);

  const handleFormSubmit = async (data: IRoleInputs) => {
    await submitRole({ ...data });
  };

  if (isEditMode && isLoading) return <Loading />;
  if (isError) return <ErrorFetch />;

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <p className={styles.requiredNote}>* All fields required</p>

      <Input
        type={EInputType.TEXT}
        placeholder="Role Name"
        isRequired
        register={register}
        name="value"
        errors={errors}
        isReadonly={true}
      />
      <Textarea placeholder="Description" isRequired register={register} name="description" errors={errors} />

      <div className={styles.btn}>
        <Button
          text="Submit"
          nameClass={EButtonClass.SEC}
          typeBtn={EButtonType.SUBMIT}
          size={EButtonSize.LG}
          isLink={false}
          isDisabled={!isValid}
        />
      </div>

      {isNotificationVisible && <Notification isSuccess={isSuccess} msg={notificationMsgState} />}
    </form>
  );
};

export default RoleForm;
