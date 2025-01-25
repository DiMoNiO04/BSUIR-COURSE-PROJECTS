import React from 'react';
import { View, ScrollView } from 'react-native';
import { InfoRecipe, Ingredients, Instruction } from '@/components/elements';
import RecipeTop from './RecipeTop';
import { ErrorFetch, Loading, NothingMessage } from '@/components/ui';
import { ON_MODERATION } from '@/utils';
import { IRecipe } from '@/api';

interface IRecipeContent {
  recipe: IRecipe | null;
  isError: boolean;
  isLoading: boolean;
}

const RecipeContent: React.FC<IRecipeContent> = ({ recipe, isError, isLoading }) => {
  if (isError) return <ErrorFetch />;
  if (isLoading) return <Loading />;

  return (
    <View className="my-16">
      {recipe ? (
        <>
          <RecipeTop
            id={recipe.id}
            title={recipe.title}
            shortDescription={recipe.shortDescription}
            image={recipe.image}
            author={recipe.author}
            category={recipe.category!.name}
            createdAt={recipe.createdAt}
            isPublished={recipe.isPublished}
          />
          <View className="mt-8 gap-y-4">
            <InfoRecipe calories={recipe.calories} cookingTime={recipe.cookingTime} />
            <View className="gap-y-4">
              <Ingredients ingredients={recipe.ingredients} />
              <Instruction instructions={recipe.instructions} />
            </View>
          </View>
        </>
      ) : (
        <NothingMessage text={ON_MODERATION} />
      )}
    </View>
  );
};

export default RecipeContent;
