import { IRecipe } from '@/api';
import capitalizeFirstLetter from './capitalizeFirstLetter';

const getDescriptionRecipe = (recipe: IRecipe) => {
  if (recipe) {
    return `Discover the delicious ${capitalizeFirstLetter(recipe.title)} recipe ${recipe.category?.name} category.`;
  }
  return 'Explore our variety of delicious recipes and find your next favorite dish!';
};

export default getDescriptionRecipe;
