import { IRecipe } from '@/api';
import ESortOptions from '@/utils/enums/sortOptions';
import { useState } from 'react';

const useSortRecipes = (recipes: IRecipe[]) => {
  const [sortOption, setSortOption] = useState<ESortOptions | null>(null);

  const handleSortChange = (value: string | number) => {
    setSortOption(value as ESortOptions);
  };

  const sortedRecipes = () => {
    if (!recipes) return [];

    const recipesCopy = [...recipes];

    switch (sortOption) {
      case ESortOptions.TITLE_A_TO_Z:
        return recipesCopy.sort((a, b) => a.title.localeCompare(b.title));
      case ESortOptions.TITLE_Z_TO_A:
        return recipesCopy.sort((a, b) => b.title.localeCompare(a.title));
      case ESortOptions.CREATED_AT_OLDEST:
        return recipesCopy.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case ESortOptions.CREATED_AT_NEWEST:
        return recipesCopy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case ESortOptions.COOKING_TIME_MIN:
        return recipesCopy.sort((a, b) => a.cookingTime - b.cookingTime);
      case ESortOptions.COOKING_TIME_MAX:
        return recipesCopy.sort((a, b) => b.cookingTime - a.cookingTime);
      case ESortOptions.CALORIES_MIN:
        return recipesCopy.sort((a, b) => a.calories - b.calories);
      case ESortOptions.CALORIES_MAX:
        return recipesCopy.sort((a, b) => b.calories - a.calories);
      default:
        return recipesCopy;
    }
  };

  return {
    sortOption,
    handleSortChange,
    sortedRecipes,
  };
};

export default useSortRecipes;
