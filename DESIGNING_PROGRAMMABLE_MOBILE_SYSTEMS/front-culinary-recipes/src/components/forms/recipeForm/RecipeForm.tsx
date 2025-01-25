import React, { useEffect, useState } from 'react';
import { Button, Input, Textarea, ImageUpload, Notification, Loading, ErrorFetch } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EActionType, EButtonClass, EButtonSize, EButtonType, EInputType, EUrls } from '@/utils';
import schemaRecipe from './schema';
import { useGetCategories, useGetRecipe, useRecipe } from '@/api/hooks';
import { useFileInput } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './RecipeForm.module.scss';

export interface IRecipeInputs {
  title: string;
  shortDescription: string;
  cookingTime: number;
  calories: number;
  image: string;
  ingredients: string;
  instructions: string;
  categoryId: number;
}

interface IRecipeForm {
  actionType: EActionType;
}

const RecipeForm: React.FC<IRecipeForm> = ({ actionType }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: recipeData, isLoading } = useGetRecipe(id ? Number(id) : undefined);
  const isEditMode = actionType === EActionType.UPDATE;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<IRecipeInputs>({
    mode: 'onChange',
    resolver: yupResolver(schemaRecipe),
    defaultValues: recipeData || {},
  });

  const { submitRecipe, notificationMsg, isError } = useRecipe(actionType, Number(id));
  const { data: categories } = useGetCategories();
  const { filePreview, handleFileSelect, setFilePreview } = useFileInput(setValue, trigger);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationMsgState, setNotificationMsgState] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (recipeData) {
      reset(recipeData);
      setValue('image', recipeData.image || '');
      setFilePreview(recipeData.image || null);
    }
  }, [recipeData, reset, setValue, setFilePreview]);

  useEffect(() => {
    if (notificationMsg) {
      setNotificationMsgState(notificationMsg);
      setIsNotificationVisible(true);

      if (!isError) {
        setIsSuccess(true);
        const timer = setTimeout(() => {
          reset();
          navigate(EUrls.PROFILE_RECIPES);
        }, 1500);
        return () => clearTimeout(timer);
      } else {
        setIsSuccess(false);
      }
    }
  }, [notificationMsg, reset, navigate, isError]);

  const handleFormSubmit = async (data: IRecipeInputs) => submitRecipe({ ...data, image: filePreview || '' });

  if (isEditMode && isLoading) return <Loading />;
  if (isError) return <ErrorFetch />;

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <p className={styles.requiredNote}>* All fields required</p>

      <Input
        type={EInputType.TEXT}
        placeholder="Recipe Title"
        isRequired
        register={register}
        name="title"
        errors={errors}
      />
      <Input
        type={EInputType.NUMBER}
        placeholder="Cooking Time (minutes)"
        isRequired
        register={register}
        name="cookingTime"
        errors={errors}
      />
      <Input
        type={EInputType.NUMBER}
        placeholder="Calories"
        isRequired
        register={register}
        name="calories"
        errors={errors}
      />
      <Textarea
        placeholder="Short Description"
        isRequired
        register={register}
        name="shortDescription"
        errors={errors}
      />
      <Textarea
        placeholder="Ingredients (separate with semicolon)"
        isRequired
        register={register}
        name="ingredients"
        errors={errors}
        isLabelSemicolon={true}
      />
      <Textarea
        placeholder="Instructions"
        isRequired
        register={register}
        name="instructions"
        errors={errors}
        isLabelSemicolon={true}
      />

      <ImageUpload filePreview={filePreview} onFileSelect={handleFileSelect} />

      <select {...register('categoryId')} defaultValue="">
        <option value="" disabled>
          Select Category
        </option>
        {categories?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>

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

export default RecipeForm;
