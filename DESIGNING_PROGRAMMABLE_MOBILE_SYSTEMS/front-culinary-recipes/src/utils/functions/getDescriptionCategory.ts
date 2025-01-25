import { ICategory } from '@/api';
import capitalizeFirstLetter from './capitalizeFirstLetter';

const getDescriptionCategory = (category?: ICategory) => {
  if (category) {
    return `Explore a variety of delicious recipes in the ${capitalizeFirstLetter(category.name)} category. 
      Find your next favorite dish among our curated selection!`;
  }
  return 'Discover a variety of delicious recipes in this category. Browse through our collection and find your next favorite dish!';
};

export default getDescriptionCategory;
