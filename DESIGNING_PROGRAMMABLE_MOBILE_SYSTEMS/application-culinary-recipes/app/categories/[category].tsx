import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Footer, Header } from '@/components/layouts';
import CategoryTemplate from '@/components/sections/CategoryTemplate';
import { useLocalSearchParams } from 'expo-router';
import { useGetCategory } from '@/api/hooks';

const CategoryPage: React.FC = () => {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();

  const { data: categoryData, isLoading, isError } = useGetCategory(String(category));
  const [isDelayed, setIsDelayed] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayed(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: `Category: ${category}`,
    });
  }, [navigation, category]);

  if (isDelayed) return null;

  return (
    <SafeAreaView className="bg-whiteDark h-full">
      <Header />
      <FlatList
        data={[1]}
        renderItem={() => (
          <View>
            <CategoryTemplate isError={isError} isLoading={isLoading} category={categoryData} />
          </View>
        )}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<Footer />}
      />
      <StatusBar backgroundColor="#ffd7c9" style="light" />
    </SafeAreaView>
  );
};

export default CategoryPage;
