import React from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NotFound } from '@/components/sections';

const NotFoundPage: React.FC = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[1]}
        renderItem={() => (
          <View>
            <NotFound />
          </View>
        )}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar backgroundColor="#ffd7c9" style="light" />
    </SafeAreaView>
  );
};

export default NotFoundPage;
