import React from 'react';
import { View, Text } from 'react-native';
import TitleLinkSection from './TitleSectionLink';

interface ITitleSection {
  title: string;
  link?: string;
  linkTxt?: string;
}

const TitleSection: React.FC<ITitleSection> = ({ title, link, linkTxt }) => {
  return (
    <View className="flex-row justify-between items-center mb-6">
      <Text className="font-playfairBold text-[30px] text-black">{title}</Text>
      <TitleLinkSection link={link} linkTxt={linkTxt} />
    </View>
  );
};

export default TitleSection;
