import React from 'react';
import { View, Text, Image } from 'react-native';
import { TitleSection } from '@/components/ui';

const ShareYourRecipe: React.FC = () => {
  return (
    <View className="bg-pink px-4 py-10 mb-16">
      <View className="flex flex-col items-center">
        <View className="mb-6 w-full">
          <Image
            source={require('@/assets/images/templates/shareYourRecipe.webp')}
            alt="Share your recipe"
            style={{ width: '100%', height: 'auto', aspectRatio: 1 }}
            className="rounded-lg"
          />
        </View>
        <View className="flex-1">
          <TitleSection title="Share your recipes" />
          <Text className="text-black text-lg font-bold leading-7 mb-6">
            Got a delicious recipe you&apos;d like to share with the world? Whether it&apos;s a family favorite or a new
            creation, we want to hear about it! Share your culinary masterpieces and inspire others to cook up something
            amazing. Start your recipe journey with us today!
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ShareYourRecipe;
