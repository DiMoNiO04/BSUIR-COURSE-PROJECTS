import React from 'react';
import { View, Text } from 'react-native';

interface IErrorFetch {
  message?: string | null;
}

const ErrorFetch: React.FC<IErrorFetch> = ({ message }) => {
  return (
    <View className="p-10">
      <Text className="text-red font-playfairBold text-xl italic">
        {message || 'Error loading. Please try again later.'}
      </Text>
    </View>
  );
};

export default ErrorFetch;
