import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Footer, Header } from '@/components/layouts';
import { useLocalSearchParams } from 'expo-router';
import SearchResults from '@/components/sections/SearchResults';

const SearchPage: React.FC = () => {
  const navigation = useNavigation();
  const { query } = useLocalSearchParams();

  const searchQuery = Array.isArray(query) ? query[0] : query || '';

  useEffect(() => {
    navigation.setOptions({
      title: 'Search',
    });
  }, [navigation]);

  return (
    <SafeAreaView className="bg-whiteDark h-full">
      <Header />
      <FlatList
        data={[1]}
        renderItem={() => (
          <View>
            <SearchResults query={searchQuery} />
          </View>
        )}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<Footer />}
      />
      <StatusBar backgroundColor="#ffd7c9" style="light" />
    </SafeAreaView>
  );
};

export default SearchPage;
