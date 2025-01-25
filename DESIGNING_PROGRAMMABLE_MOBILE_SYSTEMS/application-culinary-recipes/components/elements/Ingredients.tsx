import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { splitBySemicolon } from '@/utils/functions';

interface IIngredients {
  ingredients: string;
}

const Ingredients: React.FC<IIngredients> = ({ ingredients }) => {
  if (!ingredients) return null;

  const ingredientList = splitBySemicolon(ingredients);

  return (
    <View className="mt-8 px-4">
      <Text className="text-2xl font-bold text-black mb-4">Ingredients</Text>
      <FlatList
        data={ingredientList}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="flex-row items-start gap-x-2 mb-4">
            <View className="w-2 h-2 bg-orange rounded-full mt-2" />
            <Text className="font-interRegular text-gray">{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Ingredients;
