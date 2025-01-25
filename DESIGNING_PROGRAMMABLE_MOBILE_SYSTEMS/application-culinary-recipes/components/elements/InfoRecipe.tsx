import React from 'react';
import { View, Text } from 'react-native';

interface IInfoRecipe {
  cookingTime: number;
  calories: number;
}

const InfoRecipe: React.FC<IInfoRecipe> = ({ cookingTime, calories }) => {
  return (
    <View className="flex-row items-start gap-x-6 px-4">
      <View className="flex-col pr-6 border-r border-gray-300">
        <Text className="text-lg font-playfairRegular text-gray-500">PREP TIME</Text>
        <Text className="text-sm font-interRegular text-black">{cookingTime} MIN</Text>
      </View>
      <View className="flex-col">
        <Text className="text-lg font-playfairRegular text-gray-500">CALORIES</Text>
        <Text className="text-sm font-interRegular text-black">{calories}</Text>
      </View>
    </View>
  );
};

export default InfoRecipe;
