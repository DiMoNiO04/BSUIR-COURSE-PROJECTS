import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';

interface INothingMessage {
  text: string;
}

const NothingMessage: React.FC<INothingMessage> = ({ text }) => {
  return (
    <View className={`p-5`}>
      <Text className={`text-red font-playfairBold text-[18px] italic text-center`}>{text}</Text>
    </View>
  );
};

export default NothingMessage;
