import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, ActivityIndicator, FlatList } from 'react-native';
import { useSearch } from '@/api/hooks';
import { useDebounce, useSortRecipes } from '@/hooks';
import { sortRecipes } from '@/data';
import { ErrorFetch, Loading, NothingMessage, Select } from '@/components/ui';
import { SearchPanelCard } from '@/components/cards';

interface ISearchResultsProps {
  query: string;
}

const SearchResults: React.FC<ISearchResultsProps> = ({ query }) => {
  const [searchQuery, setSearchQuery] = useState<string>(query);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data: searchResults, isLoading, isError } = useSearch(debouncedSearchQuery);
  const { sortOption, handleSortChange, sortedRecipes } = useSortRecipes(searchResults || []);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <View className="px-4 my-16">
      <Text className="font-playfairBold text-black text-5xl pb-7 border-b border-greyLight mb-16">Search Results</Text>

      <View className="flex-col w-full border-b border-black pb-4 mb-6">
        <TextInput
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearchInputChange}
          className="w-full text-lg border-0 text-black bg-transparent"
        />
        <View className="flex-row gap-x-4 justify-between items-center">
          <Text className="text-base">{`(${searchResults ? searchResults.length : 0} recipes)`}</Text>
          {searchResults && <Select value={sortOption} onChange={handleSortChange} options={sortRecipes} />}
        </View>
      </View>

      {isError && <ErrorFetch />}
      {isLoading && <Loading />}
      {!isLoading && !isError && searchResults?.length ? (
        <FlatList
          data={sortedRecipes()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <SearchPanelCard {...item} />}
        />
      ) : (
        <NothingMessage text="Nothing was found for your request" />
      )}
    </View>
  );
};

export default SearchResults;
