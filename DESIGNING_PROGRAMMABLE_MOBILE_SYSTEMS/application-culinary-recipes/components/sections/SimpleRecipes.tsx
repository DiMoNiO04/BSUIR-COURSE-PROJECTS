import React from 'react';
import { View, Text, Image } from 'react-native';
import { TitleSection } from '../ui';

const SimpleRecipes: React.FC = () => {
  return (
    <View className="px-4 mb-16">
      <View className="container mx-auto">
        <View className="flex flex-col gap-10 items-center">
          <View>
            <TitleSection title="Simple, Easy Recipes for all" />
            <Text className="text-regularInter text-grey">
              Juicy meatballs brisket slammin baked shoulder. Juicy smoker soy sauce burgers brisket. Polenta mustard
              hunk greens. Wine technique snack skewers chuck excess. Oil heat slowly. Slices natural delicious, set
              aside magic tbsp skillet, bay leaves brown centerpiece.
            </Text>
          </View>

          <View className="w-full">
            <Image
              source={require('@/assets/images/templates/simpleRecipes.webp')}
              alt="Share your recipe"
              style={{ width: '100%', height: 'auto', aspectRatio: 1 }}
              className="rounded-lg"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SimpleRecipes;
