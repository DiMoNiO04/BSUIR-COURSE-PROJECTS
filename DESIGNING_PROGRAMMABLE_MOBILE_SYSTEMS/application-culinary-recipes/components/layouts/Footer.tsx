import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LogoIcon } from '@/components/icons';
import { Socials } from '@/components/ui';
import { EUrls } from '@/utils';
import { RelativePathString, router } from 'expo-router';

const links = [
  { text: 'Home', href: '/' },
  { text: 'About us', href: '/about' },
  { text: 'Categories', href: EUrls.CATEGORIES },
  { text: 'Recipes', href: '/recipes' },
];

const Footer: React.FC = () => {
  return (
    <View className="bg-greyLight px-4 py-8">
      <View className="flex flex-col gap-y-6 border-b border-gray-300 pb-6">
        <View className="flex flex-row gap-x-4 items-start">
          <LogoIcon className="w-32 h-10" />
          <Text className="text-gray-600 text-sm flex-1">
            On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and
            demoralized by the charms of pleasure of the moment.
          </Text>
        </View>

        <View className="flex flex-row justify-between">
          {links.map(({ text, href }) => (
            <TouchableOpacity key={text}>
              <Text onPress={() => router.push(href as RelativePathString)} className="text-gray text-lg">
                {text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="flex flex-row justify-between items-center mt-6">
        <Text className="text-gray-500 text-sm">© 2024 Tastebite - All rights reserved</Text>
        <Socials color="#7F7F7F" />
      </View>
    </View>
  );
};

export default Footer;
