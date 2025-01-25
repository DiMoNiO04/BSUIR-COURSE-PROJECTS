import React from 'react';
import { ErrorFetch, Loading, NothingMessage, TitleSection } from '@/components/ui';
import { useGetCategoryRecipes } from '@/api/hooks';
import RecipesCardsList from '../elements/RecipesCardsList';
import { View } from 'react-native';

interface IAlsoLike {
  idRecipe: number | undefined;
  category: string | undefined;
}

const AlsoLike: React.FC<IAlsoLike> = ({ idRecipe, category }) => {
  const { data: recipes, isError, isLoading, message } = useGetCategoryRecipes(category);

  const filteredRecipes = recipes?.filter((recipe) => recipe.id !== idRecipe) || [];

  if (filteredRecipes.length < 0) return null;

  return (
    <View className="mb-16">
      <View className="w-full px-4">
        <TitleSection title="You might also like" />

        {isLoading && <Loading />}
        {isError && <ErrorFetch />}

        {!isLoading && !isError && filteredRecipes.length > 0 ? (
          <RecipesCardsList cards={filteredRecipes.slice(0, 7)} isLoading={isLoading} isError={isError} msg={message} />
        ) : (
          !isLoading && !isError && <NothingMessage text={message!} />
        )}
      </View>
    </View>
  );
};

export default AlsoLike;
