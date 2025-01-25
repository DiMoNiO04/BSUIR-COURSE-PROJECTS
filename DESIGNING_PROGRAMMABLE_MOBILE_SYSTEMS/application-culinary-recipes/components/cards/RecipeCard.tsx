import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useFavorites, useGetFavorites } from '@/api/hooks';
import { EFavoriteActionType, EUrls } from '@/utils';
import { LikeIcon } from '@/components/icons';
import { router, RelativePathString } from 'expo-router';
import { useAuthToken } from '@/hooks';

interface IRecipeCard {
  title: string;
  image: string;
  id: number;
}

const RecipeCard: React.FC<IRecipeCard> = ({ title, image, id }) => {
  const { token, role } = useAuthToken();
  const [isLiked, setIsLiked] = useState(false);
  const { data: favorites } = useGetFavorites();
  const { executeFavoriteAction, isError } = useFavorites(
    isLiked ? EFavoriteActionType.REMOVE : EFavoriteActionType.ADD,
    String(id)
  );

  useEffect(() => {
    if (favorites && favorites.some((favorite) => favorite.id === id)) {
      setIsLiked(true);
    }
  }, [favorites, id]);

  const handleLikeClick = async () => {
    await executeFavoriteAction();
    if (!isError) {
      setIsLiked(!isLiked);
    }
  };

  const handlePress = () => {
    router.push(`${EUrls.RECIPES}/${id}/` as RelativePathString);
  };

  return (
    <TouchableOpacity onPress={handlePress} className="flex-col items-center justify-start px-2 w-1/2 relative">
      {token && (
        <TouchableOpacity
          onPress={handleLikeClick}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white z-10 ${isLiked ? 'bg-orange-500' : ''}`}
        >
          <LikeIcon color={isLiked ? '#ff642f' : '#8B8D95'} />
        </TouchableOpacity>
      )}
      <View className="w-full aspect-square mb-2">
        <Image source={{ uri: image }} alt={title} className="w-full h-full" resizeMode="cover" />
      </View>
      <Text className="font-interBold text-[14px] text-black text-center leading-5">{title}</Text>
    </TouchableOpacity>
  );
};

export default RecipeCard;
