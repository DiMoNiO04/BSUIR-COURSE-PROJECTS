import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';
import { EUrls } from '@/utils';

const MenuHeader: React.FC = () => {
  const router = useRouter();

  const menuItems = [
    { title: 'About us', url: EUrls.ABOUT },
    { title: 'Categories', url: EUrls.CATEGORIES },
    { title: 'Recipes', url: EUrls.RECIPES },
  ];

  return (
    <View className="flex-col items-start w-full gap-y-6 border-b border-gray-300 pb-8 mb-12">
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.title}
          onPress={() => router.push(item.url as unknown as RelativePathString)}
          className="relative"
        >
          <Text className="font-interMedium text-lg">{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MenuHeader;
