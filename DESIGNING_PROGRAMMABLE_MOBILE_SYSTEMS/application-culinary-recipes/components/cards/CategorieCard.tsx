import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { RelativePathString, router } from 'expo-router';
import { EUrls } from '@/utils';

interface ICategorieCard {
  name: string;
  image: string;
}

const CategorieCard: React.FC<ICategorieCard> = ({ name, image }) => {
  const handlePress = () => {
    router.push(`${EUrls.CATEGORIES}/${name.toLowerCase()}` as RelativePathString);
  };

  return (
    <TouchableOpacity onPress={handlePress} className="flex-col items-center justify-start px-3 w-1/3">
      <View className="w-full aspect-square rounded-full mb-2">
        <Image source={{ uri: image }} alt={name} className="w-full h-full" resizeMode="cover" />
      </View>
      <Text numberOfLines={1} className="font-interBold text-[14px] text-black text-center">
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategorieCard;
