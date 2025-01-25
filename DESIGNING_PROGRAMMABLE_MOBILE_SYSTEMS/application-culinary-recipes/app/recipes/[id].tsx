import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Footer, Header } from '@/components/layouts';
import { useLocalSearchParams } from 'expo-router';
import { useGetRecipe } from '@/api/hooks';
import { AlsoLike, RecipeContent } from '@/components/sections';

const RecipePage: React.FC = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const { data: recipe, isLoading, isError } = useGetRecipe(Number(id));
  const [isDelayed, setIsDelayed] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayed(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: `Recipe №${id}`,
    });
  }, [navigation, id]);

  if (isDelayed) return null;
  if (!recipe) return null;

  return (
    <SafeAreaView className="bg-whiteDark h-full">
      <Header />
      <FlatList
        data={[1]}
        renderItem={() => (
          <View>
            <RecipeContent isError={isError} isLoading={isLoading} recipe={recipe} />
            <AlsoLike idRecipe={recipe.id} category={recipe.category?.name || ''} />
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

export default RecipePage;
