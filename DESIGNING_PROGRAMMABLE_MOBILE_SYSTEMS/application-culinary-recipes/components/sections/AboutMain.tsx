import React from 'react';
import { View, Text, Image } from 'react-native';
import { TitleSection } from '../ui';

const AboutMain: React.FC = () => {
  return (
    <View className="my-16 px-4">
      <Text className="font-playfairBold text-black text-5xl pb-7 border-b border-greyLight mb-16">About us</Text>

      <View className="flex flex-col gap-4">
        <TitleSection title="We’re a group of foodies who love cooking and the internet" />

        <View className="w-full">
          <Image
            source={require('@/assets/images/templates/aboutMain.webp')}
            alt="Share your recipe"
            style={{ width: '100%', height: 'auto', aspectRatio: 1 }}
            className="rounded-lg"
          />
        </View>

        <Text className="font-interRegular text-grey">
          Food qualities braise chicken cuts bowl through slices butternut snack. Tender meat juicy dinners. One-pot low
          heat plenty of time adobo fat raw soften fruit. Sweet renders bone-in marrow richness kitchen, fricassee
          basted pork shoulder. Delicious butternut squash hunk.
        </Text>
      </View>
    </View>
  );
};

export default AboutMain;
