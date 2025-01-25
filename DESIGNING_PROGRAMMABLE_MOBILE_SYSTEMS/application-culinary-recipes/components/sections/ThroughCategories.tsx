import React from 'react';
import { View, FlatList } from 'react-native';
import { ErrorFetch, Loading, NothingMessage, TitleSection } from '@/components/ui';
import { useGetCategories } from '@/api/hooks';
import { EUrls } from '@/utils';
import { CategorieCard } from '../cards';

const ThroughCategories: React.FC = () => {
  const { data: categories, isLoading, isError } = useGetCategories();

  return (
    <View className="px-4 mb-16">
      <TitleSection title="Categories" linkTxt="View All" link={EUrls.CATEGORIES} />

      {isLoading && !isError && <Loading />}
      {isError && !isLoading && <ErrorFetch />}

      {!isLoading && !isError && categories && categories.length > 0 ? (
        <FlatList
          data={categories.slice(0, 6)}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          renderItem={({ item }) => <CategorieCard key={item.id} name={item.name} image={item.image} />}
          className="gap-4"
        />
      ) : (
        !isLoading &&
        !isError &&
        categories &&
        categories.length === 0 && (
          <NothingMessage text="No categories available at the moment. Please check back later!" />
        )
      )}
    </View>
  );
};

export default ThroughCategories;
