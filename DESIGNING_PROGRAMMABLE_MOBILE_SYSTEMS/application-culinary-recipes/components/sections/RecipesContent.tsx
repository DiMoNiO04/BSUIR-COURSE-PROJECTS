import React, { useState } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { useGetRecipes } from '@/api/hooks';
import { IRecipe } from '@/api';
import { RecipeCard } from '@/components/cards';
import { ErrorFetch, Loading, Select, NothingMessage } from '@/components/ui';
import { useDebounce, useSortRecipes } from '@/hooks';
import { sortRecipes } from '@/data';

const RecipesContent: React.FC = () => {
  const { data: recipes, isLoading, isError } = useGetRecipes();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filteredRecipes =
    recipes?.filter((recipe: IRecipe) => recipe.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())) || [];

  const { sortOption, handleSortChange, sortedRecipes } = useSortRecipes(filteredRecipes);

  const categorizedRecipes = sortedRecipes().reduce((acc: Record<string, IRecipe[]>, recipe: IRecipe) => {
    const categoryName = recipe.category?.name || 'Other';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(recipe);
    return acc;
  }, {});

  const sortedCategories = Object.keys(categorizedRecipes || {}).sort();

  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text);
  };

  const renderCategoryHeader = (category: string) => (
    <Text className="text-3xl font-interMedium font-italic">{category}</Text>
  );

  const renderRecipeItem = ({ item }: { item: IRecipe }) => <RecipeCard {...item} />;

  const renderCategory = ({ item: category }: { item: string }) => (
    <View key={category} className="gap-y-4 pb-8 mb-12 border-b border-gray-300">
      {renderCategoryHeader(category)}
      <FlatList
        data={categorizedRecipes[category]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRecipeItem}
        numColumns={2}
        className="gap-4"
      />
    </View>
  );

  return (
    <View className="px-4 my-16">
      <Text className="font-playfairBold text-black text-5xl pb-7 border-b border-greyLight mb-16">Recipes</Text>

      {isError && <ErrorFetch />}
      {isLoading && <Loading />}

      {!isLoading && !isError && (
        <>
          <View className="flex-col justify-between w-full items-start mb-12 pb-4 border-b border-gray-300 gap-y-4">
            <TextInput
              placeholder="Search recipes..."
              value={searchQuery}
              onChangeText={handleSearchInputChange}
              className="text-lg text-black border-0 bg-transparent flex-grow"
            />
            <View className="flex-row items-end justify-end w-full gap-x-8">
              <Text className="text-base">{`(${filteredRecipes.length} recipes)`}</Text>
              <Select value={sortOption} onChange={handleSortChange} options={sortRecipes} />
            </View>
          </View>

          {filteredRecipes.length > 0 ? (
            <FlatList data={sortedCategories} keyExtractor={(item) => item} renderItem={renderCategory} />
          ) : (
            <NothingMessage text="No recipes found for your search." />
          )}
        </>
      )}
    </View>
  );
};

export default RecipesContent;
