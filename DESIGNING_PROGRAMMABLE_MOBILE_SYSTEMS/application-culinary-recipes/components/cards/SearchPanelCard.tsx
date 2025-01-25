import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { RelativePathString, router } from 'expo-router';
import { EUrls } from '@/utils';
import { IRecipe } from '@/api';

const SearchPanelCard: React.FC<IRecipe> = ({ id, title, image, category }) => {
  const handlePress = () => {
    router.push(`${EUrls.RECIPES}/${id}/` as RelativePathString);
  };

  return (
    <TouchableOpacity onPress={handlePress} className="flex-row items-center gap-x-3 py-4 border-b border-gray-300">
      <View className="w-16 h-16">
        <Image source={{ uri: image }} alt={title} className="w-full h-full rounded" resizeMode="cover" />
      </View>
      <View className="flex-1">
        <Text numberOfLines={1} className="font-interSemibold text-[14px] text-black">
          {title}
        </Text>
        {category?.name && (
          <Text numberOfLines={1} className="font-interRegular text-[12px] text-gray-500">
            {category.name}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SearchPanelCard;
