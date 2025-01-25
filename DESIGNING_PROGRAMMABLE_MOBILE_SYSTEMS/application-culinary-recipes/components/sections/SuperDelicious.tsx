import React from 'react';
import { View, FlatList } from 'react-native';
import { ErrorFetch, Loading, NothingMessage, TitleSection } from '@/components/ui';
import { useGetRecipes } from '@/api/hooks';
import { SuperDeliciousCard } from '../cards';

const SuperDelicious: React.FC = () => {
  const { data: recipes, isError, isLoading, message } = useGetRecipes();

  return (
    <View className="px-4 mb-16">
      <TitleSection title="Super Delicious" />

      {isLoading && !isError && <Loading />}
      {isError && !isLoading && <ErrorFetch />}

      {!isLoading && !isError && recipes && recipes.length > 0 ? (
        <FlatList
          data={recipes.slice(0, 4)}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
          renderItem={({ item }) => <SuperDeliciousCard key={item.id} {...item} />}
          className="overflow-visible gap-4"
        />
      ) : (
        !isLoading &&
        !isError &&
        recipes &&
        recipes.length === 0 && <NothingMessage text={message || 'No recipes available at the moment.'} />
      )}
    </View>
  );
};

export default SuperDelicious;
