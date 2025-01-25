import React, { useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Footer, Header } from '@/components/layouts';
import RecipeForm from '@/components/forms/recipeForm/RecipeForm';
import { EActionType } from '@/utils';

const CreateRecipePage: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Create Recipe',
    });
  }, [navigation]);

  return (
    <SafeAreaView className="bg-whiteDark h-full">
      <Header />
      <FlatList
        data={[1]}
        renderItem={() => (
          <View className="px-4 my-16">
            <Text className="font-playfairBold text-black text-5xl pb-7 border-b border-greyLight mb-16">
              Create Recipe
            </Text>
            <RecipeForm actionType={EActionType.CREATE} />
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

export default CreateRecipePage;
