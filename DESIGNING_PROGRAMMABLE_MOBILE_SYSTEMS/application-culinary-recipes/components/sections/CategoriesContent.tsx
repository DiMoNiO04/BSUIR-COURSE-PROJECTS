import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useGetCategories } from '@/api/hooks';
import { CategorieCard } from '@/components/cards';
import { ErrorFetch, Loading, NothingMessage } from '@/components/ui';

const CategoriesContent: React.FC = () => {
  const { data: categories, isLoading, isError } = useGetCategories();

  return (
    <View className="my-16">
      <View className="container px-4">
        <Text className="font-playfairBold text-black text-5xl pb-7 border-b border-greyLight mb-16">Categories</Text>

        {isError && <ErrorFetch />}
        {isLoading && <Loading />}

        {!isLoading &&
          !isError &&
          (categories && categories.length > 0 ? (
            <View className="flex-row flex-wrap gap-8">
              <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                renderItem={({ item }) => <CategorieCard key={item.id} name={item.name} image={item.image} />}
                className="gap-4"
              />
            </View>
          ) : (
            <NothingMessage text="No categories available at the moment. Please check back later!" />
          ))}
      </View>
    </View>
  );
};

export default CategoriesContent;
