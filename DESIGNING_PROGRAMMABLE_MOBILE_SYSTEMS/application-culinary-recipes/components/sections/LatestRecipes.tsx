import React from 'react';
import { View } from 'react-native';
import { TitleSection } from '@/components/ui';
import { EUrls } from '@/utils';
import { useGetRecipes } from '@/api/hooks';
import RecipesCardsList from '../elements/RecipesCardsList';

const LatestRecipes: React.FC = () => {
  const { data: recipes, isError, isLoading, message } = useGetRecipes();

  const sortedRecipes = recipes
    ? [...recipes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 15)
    : [];

  return (
    <View className="px-4 mb-16">
      <TitleSection title="Latest Recipes" linkTxt="View All" link={EUrls.RECIPES} />
      <RecipesCardsList cards={sortedRecipes.slice(0, 10)} isLoading={isLoading} isError={isError} msg={message} />
    </View>
  );
};

export default LatestRecipes;
