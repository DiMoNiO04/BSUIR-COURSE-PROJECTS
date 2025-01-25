import React, { useEffect, useState } from 'react';
import { View, Alert, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorFetch, Input, Loading, Textarea } from '@/components/ui';
import Button from '@/components/ui/Button';
import { EActionType, EButtonClass, EButtonSize, EInputType, EUrls } from '@/utils';
import { useGetRecipe, useRecipes, useGetCategories } from '@/api/hooks';
import schemaRecipe from './schema';
import { Picker } from '@react-native-picker/picker';
import convertImageBase64 from '@/utils/functions/convertImageBase64';
import { RelativePathString, router } from 'expo-router';

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
  id?: number;
}

const RecipeForm: React.FC<IRecipeForm> = ({ actionType, id }) => {
  const { data: recipeData, isLoading: isRecipeLoading } = useGetRecipe(id ? Number(id) : undefined);
  const { data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError } = useGetCategories();
  const isEditMode = actionType === EActionType.UPDATE;

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<IRecipeInputs>({
    mode: 'onChange',
    resolver: yupResolver(schemaRecipe),
    defaultValues: recipeData || {},
  });

  const { submitRecipe, isError: isSubmitError, notificationMsg } = useRecipes(actionType, Number(id));
  const [filePreview, setFilePreview] = useState<string | null>(null);

  useEffect(() => {
    if (recipeData) {
      reset(recipeData);
      setValue('image', recipeData.image || '');
      setFilePreview(recipeData.image || null);
    }
  }, [recipeData, reset, setValue]);

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'We need access to your photos to upload an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) return;

    const { uri } = result.assets[0];
    setFilePreview(uri);

    try {
      const base64Uri = await convertImageBase64(uri);
      setValue('image', base64Uri, { shouldValidate: true });
    } catch (err) {
      console.error('Error converting to Base64:', err);
      Alert.alert('Error', 'Failed to process the image.');
    }
  };

  const handleFormSubmit = async (data: IRecipeInputs) => {
    submitRecipe({ ...data, image: data.image || '' })
      .then(() => {
        Alert.alert('Success', notificationMsg || 'Recipe saved successfully');
        router.push(EUrls.PROFILE_RECIPES as unknown as RelativePathString);
      })
      .catch((error) => {
        Alert.alert('Error', error.message || 'Failed to save the recipe');
      });
  };

  if (isEditMode && isRecipeLoading) return <Loading />;
  if (isSubmitError || isCategoriesError) return <ErrorFetch />;

  return (
    <View className="flex flex-col gap-y-6">
      <Text className="text-orange italic">* All fields required</Text>

      <Input
        type={EInputType.TEXT}
        placeholder="Recipe Title"
        isRequired
        control={control}
        name="title"
        errors={errors}
      />
      <Input
        type={EInputType.NUMBER}
        placeholder="Cooking Time (minutes)"
        isRequired
        control={control}
        name="cookingTime"
        errors={errors}
      />
      <Input
        type={EInputType.NUMBER}
        placeholder="Calories"
        isRequired
        control={control}
        name="calories"
        errors={errors}
      />
      <Textarea placeholder="Short Description" isRequired control={control} name="shortDescription" errors={errors} />
      <Textarea
        placeholder="Ingredients (separate with semicolon)"
        isRequired
        control={control}
        name="ingredients"
        errors={errors}
        isLabelSemicolon={true}
      />
      <Textarea
        placeholder="Instructions"
        isRequired
        control={control}
        name="instructions"
        errors={errors}
        isLabelSemicolon={true}
      />

      <View>
        {isCategoriesLoading ? (
          <Text>Loading categories...</Text>
        ) : (
          <Picker
            className="border border-greyLight"
            selectedValue=""
            onValueChange={(value) => setValue('categoryId', Number(value), { shouldValidate: true })}
          >
            <Picker.Item label="Select a category" value="" />
            {categories?.map((category) => <Picker.Item key={category.id} label={category.name} value={category.id} />)}
          </Picker>
        )}
        {errors.categoryId && <Text className="text-red">{errors.categoryId.message}</Text>}
      </View>

      <View>
        <Button text="Upload Image" nameClass={EButtonClass.DEF} size={EButtonSize.LG} onPress={handleImagePick} />
        {filePreview && (
          <View className="mt-4">
            <Text>Preview:</Text>
            <Image source={{ uri: filePreview }} style={{ width: 150, height: 150, borderRadius: 8 }} />
          </View>
        )}
      </View>

      <View className="mt-4">
        <Button
          text="Submit"
          nameClass={EButtonClass.SEC}
          size={EButtonSize.LG}
          isLink={false}
          isDisabled={!isValid}
          onPress={handleSubmit(handleFormSubmit)}
        />
      </View>
    </View>
  );
};

export default RecipeForm;
