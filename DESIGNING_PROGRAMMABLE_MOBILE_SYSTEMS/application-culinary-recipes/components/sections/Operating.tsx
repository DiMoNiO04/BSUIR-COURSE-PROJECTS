import React from 'react';
import { View, Text } from 'react-native';
import { Socials } from '@/components/ui';

const Operating: React.FC = () => {
  return (
    <View className="px-4 mb-16">
      <View className="mx-auto">
        <Text className="text-xl font-interMedium text-black mb-3">Operating from NYC, Dubai and London</Text>

        <Text className="text-sm text-grey mb-8 border-b border-gray-300 pb-8">
          Gastronomy atmosphere set aside. Slice butternut cooking home. Delicious romantic undisturbed raw platter will
          meld. Thick Skewers skillet natural, smoker soy sauce wait roux. slices rosette bone-in simmer precision
          alongside baby leeks. Crafting renders aromatic enjoyment.
        </Text>

        <View className="flex-row justify-start">
          <Socials />
        </View>
      </View>
    </View>
  );
};

export default Operating;
