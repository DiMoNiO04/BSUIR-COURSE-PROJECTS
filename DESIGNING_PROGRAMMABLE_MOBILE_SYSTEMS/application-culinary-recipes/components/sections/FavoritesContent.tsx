import React, { useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { RecipesCardsList } from '@/components/elements';
import { Loading, NothingMessage } from '@/components/ui';
import { useFavorites, useGetFavorites } from '@/api/hooks';
import { EFavoriteActionType } from '@/utils';
import { DeleteIcon } from '../icons';
import ConfirmAction from '../modals/ConfirmAction'; // Импорт компонента модального окна

const FavoritesContent: React.FC = () => {
  const { data: favorites, isLoading, isError, message } = useGetFavorites();
  const {
    executeFavoriteAction,
    isError: deleteError,
    notificationMsg: deleteNotificationMsg,
  } = useFavorites(EFavoriteActionType.DELETE_ALL);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasFavorites = favorites && favorites.length > 0;

  const handleDeleteAll = async () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await executeFavoriteAction();
    setIsModalOpen(false);

    if (deleteError) {
      Alert.alert('Error', deleteNotificationMsg || 'An error occurred while deleting favorites.');
    } else {
      Alert.alert('Success', deleteNotificationMsg || 'All favorites have been deleted successfully.');
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  if (isError) {
    Alert.alert('Error', message || 'Failed to fetch favorites.');
  }

  return (
    <View className="my-16 px-4">
      <Text className="font-playfairBold text-black text-5xl pb-7 border-b border-greyLight mb-8">Favorites</Text>

      {isLoading && <Loading />}

      {!isLoading && !isError && hasFavorites ? (
        <>
          <View className="flex-row justify-between items-center py-2 mb-8 border-b border-gray-200">
            <Pressable onPress={handleDeleteAll} className="flex-row items-center">
              <DeleteIcon />
              <Text className="text-grey ml-2">Delete all</Text>
            </Pressable>
            <Text className="text-gray-600">{`${favorites.length} recipes`}</Text>
          </View>
          <RecipesCardsList cards={favorites} isLoading={isLoading} isError={isError} msg={message} />
        </>
      ) : (
        !isLoading && !isError && <NothingMessage text={message || 'No favorites found'} />
      )}

      <ConfirmAction
        isModalOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Are you sure you want to delete all favorites?"
        confirmText="Yes"
        cancelText="Cancel"
      />
    </View>
  );
};

export default FavoritesContent;
