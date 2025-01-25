import React, { useEffect, useState } from 'react';
import { Button, Input, Textarea, ImageUpload, Notification, Loading, ErrorFetch } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EActionType, EButtonClass, EButtonSize, EButtonType, EInputType, EUrls } from '@/utils';
import { useCategorie, useGetCategory } from '@/api/hooks';
import { useFileInput } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CategorieForm.module.scss';
import schemaCategorie from './schema';

export interface ICategorieInputs {
  name: string;
  description: string;
  image: string;
}

interface ICategoryForm {
  actionType: EActionType;
}

const CategorieForm: React.FC<ICategoryForm> = ({ actionType }) => {
  const navigate = useNavigate();
  const { name } = useParams<{ name: string }>();
  const { data: categorieData, isLoading } = useGetCategory(name ? String(name) : undefined);
  const isEditMode = actionType === EActionType.UPDATE;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<ICategorieInputs>({
    mode: 'onChange',
    resolver: yupResolver(schemaCategorie),
    defaultValues: categorieData || {},
  });

  const { submitCategorie, notificationMsg, isError } = useCategorie(actionType, name);
  const { filePreview, handleFileSelect, setFilePreview } = useFileInput(setValue, trigger);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationMsgState, setNotificationMsgState] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (categorieData) {
      reset(categorieData);
      setValue('image', categorieData.image || '');
      setFilePreview(categorieData.image || null);
    }
  }, [categorieData, reset, setValue, setFilePreview]);

  useEffect(() => {
    if (notificationMsg) {
      setNotificationMsgState(notificationMsg);
      setIsNotificationVisible(true);

      if (!isError) {
        setIsSuccess(true);
        const timer = setTimeout(() => {
          reset();
          navigate(EUrls.MODERATOR_CATEGORIES);
        }, 1500);
        return () => clearTimeout(timer);
      } else {
        setIsSuccess(false);
      }
    }
  }, [notificationMsg, reset, navigate, isError]);

  const handleFormSubmit = async (data: ICategorieInputs) => {
    await submitCategorie({ ...data, image: filePreview || '' });
  };

  if (isEditMode && isLoading) return <Loading />;
  if (isError) return <ErrorFetch />;

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <p className={styles.requiredNote}>* All fields required</p>

      <Input
        type={EInputType.TEXT}
        placeholder="Category Name"
        isRequired
        register={register}
        name="name"
        errors={errors}
      />
      <Textarea placeholder="Description" isRequired register={register} name="description" errors={errors} />

      <ImageUpload filePreview={filePreview} onFileSelect={handleFileSelect} />

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

export default CategorieForm;
