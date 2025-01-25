import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { CalendarIcon, LikeIcon, ProfileIcon } from '@/components/icons';
import { Rating } from '@/components/elements';
import { useFavorites, useGetFavorites } from '@/api/hooks';
import { useAuthToken } from '@/hooks';
import { EFavoriteActionType } from '@/utils';
import { IAuthorRecipe } from '@/api';

interface IRecipeTop {
  id: number;
  title: string;
  image: string;
  shortDescription: string;
  createdAt: string;
  author: IAuthorRecipe | undefined;
  category: string;
  isPublished: boolean | undefined;
}

const RecipeTop: React.FC<IRecipeTop> = ({
  id,
  title,
  category,
  author,
  createdAt,
  shortDescription,
  image,
  isPublished,
}) => {
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

  return (
    <View className="px-4">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-4xl mb-4 font-bold text-black">{title}</Text>
        {token && isPublished && (
          <Pressable onPress={handleLikeClick} className="w-8 h-8 flex items-center justify-center">
            <LikeIcon color={isLiked ? '#ff642f' : '#8B8D95'} />
          </Pressable>
        )}
      </View>

      <View className="flex-col items-center gap-y-2 border-b border-grey pb-6 mb-6 w-full">
        <View className="flex-row justify-between items-center w-full">
          {author && (
            <View className="flex-row items-center gap-x-2">
              <ProfileIcon />
              <Text className="text-sm text-black">
                {author.firstName} {author.lastName}
              </Text>
            </View>
          )}
          <View className="flex-row items-center gap-x-2">
            <CalendarIcon />
            <Text className="text-sm text-black">{new Date(createdAt).toLocaleDateString()}</Text>
          </View>
        </View>
        <View className="flex-row justify-between items-center w-full">
          <Rating rating={5} />
          <View>
            <Text className="text-sm text-black">
              <Text className="font-interMedium">Category:</Text> {category}
            </Text>
          </View>
        </View>
        {!isPublished && (
          <View className="w-full">
            <Text className="text-orange italic">It is currently under moderation</Text>
          </View>
        )}
      </View>

      <Text className="text-lg font-interRegular text-grey mb-4">{shortDescription}</Text>
      <View className="w-full h-80 rounded-lg overflow-hidden">
        <Image source={{ uri: image }} className="w-full h-full object-cover" resizeMode="cover" />
      </View>
    </View>
  );
};

export default RecipeTop;
