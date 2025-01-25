import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { RelativePathString, router } from 'expo-router';
import { EUrls } from '@/utils';
import { IRecipe } from '@/api';
import { formatDate } from '@/utils/functions';
import { Rating } from '../elements';
import { CalendarIcon, ProfileIcon } from '../icons';

const SuperDeliciousCard: React.FC<IRecipe> = ({ id, title, author, createdAt, image }) => {
  const handlePress = () => {
    router.push(`${EUrls.RECIPES}/${id}/` as RelativePathString);
  };

  return (
    <TouchableOpacity onPress={handlePress} className="flex-col rounded-lg border border-gray-200 shadow-lg">
      <View className="w-full h-[220px]">
        <Image source={{ uri: image }} className="w-full h-full" alt={title} resizeMode="cover" />
      </View>
      <View className="bg-white px-4 py-8">
        <View className="flex-col gap-y-2">
          <Rating />
          <Text className="text-black font-semibold text-lg">{title}</Text>
        </View>
        <View className="mt-4 flex-row justify-between items-center flex-wrap gap-4">
          {author && (
            <View className="flex-row items-center gap-x-2">
              <ProfileIcon />
              <Text className="text-black font-normal text-sm">
                {author.firstName} {author.lastName}
              </Text>
            </View>
          )}
          <View className="flex-row items-center gap-x-2">
            <CalendarIcon />
            <Text className="text-gray-500 text-xs">{formatDate(createdAt)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SuperDeliciousCard;
