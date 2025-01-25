import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const NotFound: React.FC = () => {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const handlePress = () => router.push('/');

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="text-orange-500 text-[96px] font-bold text-center">404</Text>
      <Text className="text-black text-lg text-center mt-4">
        Sorry, the page you are looking for does not exist. Please check the URL or return to the main page.
      </Text>
      <View className="mt-8 flex-row space-x-4">
        <TouchableOpacity onPress={goBack} className="bg-orange-500 px-4 py-2 rounded-md">
          <Text className="text-white text-base">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress} className="bg-orange-500 px-4 py-2 rounded-md">
          <Text className="text-white text-base">Main page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotFound;
