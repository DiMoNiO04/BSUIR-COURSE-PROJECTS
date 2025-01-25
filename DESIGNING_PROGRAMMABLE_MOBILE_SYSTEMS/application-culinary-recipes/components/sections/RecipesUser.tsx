import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { ErrorFetch, Loading, NothingMessage } from '@/components/ui';
import { MyRecipeCard } from '@/components/cards';
import { useGetMyRecipes } from '@/api/hooks';
import Button from '../ui/Button';
import { EButtonClass, EButtonSize, EUrls } from '@/utils';
import { router } from 'expo-router';

const RecipesUser: React.FC = () => {
  const { data: recipes, isLoading, isError } = useGetMyRecipes();

  return (
    <View className="px-4 my-16">
      <View className="flex-row justify-between items-center mb-16 border-b border-greyLight pb-7">
        <Text className="text-3xl font-playfairBold text-black">My Recipes</Text>
        <Button
          text="Create new"
          onPress={() => router.push(EUrls.CREATE_RECIPE)}
          nameClass={EButtonClass.DEF}
          size={EButtonSize.LG}
        />
      </View>

      {isError && <ErrorFetch />}
      {isLoading && <Loading />}

      {!isLoading && !isError && (
        <>
          {recipes && recipes.length > 0 ? (
            <FlatList
              data={recipes}
              renderItem={({ item }) => <MyRecipeCard key={item.id} {...item} />}
              keyExtractor={(item) => item.id.toString()}
              className="gap-8"
            />
          ) : (
            <NothingMessage text="You have no added recipes!" />
          )}
        </>
      )}
    </View>
  );
};

export default RecipesUser;
