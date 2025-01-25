import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';

interface ITitleLinkSection {
  link?: string;
  linkTxt?: string;
}

const TitleLinkSection: React.FC<ITitleLinkSection> = ({ link, linkTxt }) => {
  const router = useRouter();

  if (!link || !linkTxt) return null;

  const handlePress = () => router.push(link as RelativePathString);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text className="text-black text-[14px] font-interRegular italic border-b border-black">{linkTxt}</Text>
    </TouchableOpacity>
  );
};

export default TitleLinkSection;
