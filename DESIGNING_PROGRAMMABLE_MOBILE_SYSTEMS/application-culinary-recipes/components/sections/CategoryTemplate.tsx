import React from 'react';
import { View, Text, Image } from 'react-native';
import Select from '@/components/ui/Select';
import RecipesCardsList from '@/components/elements/RecipesCardsList';
import { useSortRecipes } from '@/hooks';
import { sortRecipes } from '@/data';
import { useGetCategoryRecipes } from '@/api/hooks';
import { NothingMessage, Loading, ErrorFetch, TitleSection } from '@/components/ui';
import { ICategory } from '@/api';

interface ICategoryTemplate {
  category: ICategory | null;
  isError: boolean;
  isLoading: boolean;
}

const CategoryTemplate: React.FC<ICategoryTemplate> = ({ category, isError, isLoading }) => {
  const {
    data: recipes,
    isError: isErrorRecipes,
    isLoading: isLoadingRecipes,
    message: messageRecipes,
  } = useGetCategoryRecipes(String(category?.name));
  const { sortOption, handleSortChange, sortedRecipes } = useSortRecipes(recipes || []);

  return (
    <View className="mb-16">
      <View className="container">
        <View className="w-full mb-12">
          <Image
            source={require('../../assets/images/templates/category.webp')}
            className="w-full h-48"
            resizeMode="cover"
          />
        </View>

        <View className="flex-col justify-between w-full items-start px-4">
          {isLoading && <Loading />}
          {isError && <ErrorFetch message={messageRecipes} />}

          {!isLoading && !isError && category ? (
            <>
              <View className="mb-4 pb-4">
                <TitleSection title={category.name} />
                <Text className="text-sm text-grey font-interRegular mt-1">{category.description}</Text>
              </View>

              {recipes && recipes.length > 1 && (
                <View className="flex-row items-end justify-between w-full gap-x-2 mb-8">
                  <Text className="text-base">({recipes?.length || 0} Recipes)</Text>
                  <Select label="Sort Recipes" value={sortOption} onChange={handleSortChange} options={sortRecipes} />
                </View>
              )}

              <View className="w-full">
                <RecipesCardsList
                  cards={sortedRecipes()}
                  isLoading={isLoadingRecipes}
                  isError={isErrorRecipes}
                  msg={messageRecipes}
                />
              </View>
            </>
          ) : (
            !isLoading && !isError && !category && <NothingMessage text="Category not found." />
          )}
        </View>
      </View>
    </View>
  );
};

export default CategoryTemplate;
