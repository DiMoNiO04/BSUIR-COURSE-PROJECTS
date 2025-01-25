import React, { useState } from 'react';
import { View, Text, Image, Pressable, Alert, TouchableOpacity } from 'react-native';
import { ConfirmAction } from '@/components/modals';
import { EActionType, EUrls } from '@/utils';
import { DeleteIcon, EditIcon } from '@/components/icons';
import { useRecipes } from '@/api/hooks';
import { RelativePathString, router } from 'expo-router';
import { IRecipe } from '@/api';

const MyRecipeCard: React.FC<IRecipe> = ({ id, title, image, isPublished }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { submitRecipe: deleteRecipe, isError, notificationMsg } = useRecipes(EActionType.DELETE, Number(id));

  const openDeleteModal = () => setIsModalOpen(true);
  const closeDeleteModal = () => setIsModalOpen(false);

  const handleConfirmDelete = async () => {
    await deleteRecipe();
    closeDeleteModal();

    if (isError) {
      Alert.alert('Error', notificationMsg || 'Failed to delete the recipe.');
    } else {
      Alert.alert('Success', notificationMsg || 'Recipe deleted successfully.');
    }
  };

  const handleEditRecipe = () => {
    router.push(`${EUrls.UPDATE_RECIPE}/${id}`);
  };

  const handleRecipeLink = () => router.push(`${EUrls.RECIPES}/${id}` as RelativePathString);

  return (
    <>
      <TouchableOpacity
        onPress={handleRecipeLink}
        className={`p-4 bg-white rounded-lg shadow-lg ${!isPublished ? 'opacity-60' : ''}`}
      >
        <View className="absolute top-8 right-8 flex gap-y-4 z-10">
          <Pressable onPress={openDeleteModal} className="p-2 bg-greyLight rounded-full">
            <DeleteIcon />
          </Pressable>
          <Pressable onPress={handleEditRecipe} className="p-2 bg-greyLight rounded-full">
            <EditIcon />
          </Pressable>
        </View>
        <Image source={{ uri: image }} className="w-full h-48 rounded-lg" resizeMode="cover" />
        <Text className="mt-2 text-lg font-semibold text-black">{title}</Text>
        {!isPublished && <Text className="mt-1 text-sm italic text-orange">It is currently under moderation</Text>}
      </TouchableOpacity>
      <ConfirmAction
        isModalOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title={`Are you sure you want to delete this recipe '${title}'?`}
      />
    </>
  );
};

export default MyRecipeCard;
