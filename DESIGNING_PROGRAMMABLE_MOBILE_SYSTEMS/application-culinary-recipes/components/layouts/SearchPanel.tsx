import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { CloseIcon } from '@/components/icons';
import { ErrorFetch, Loading, NothingMessage } from '@/components/ui';
import { SearchPanelCard } from '@/components/cards';
import { useDebounce } from '@/hooks';
import { RelativePathString, useRouter } from 'expo-router';
import { useSearch } from '@/api/hooks';
import { EButtonClass, EButtonSize } from '@/utils';
import Button from '../ui/Button';

interface ISearchPanel {
  onClose: () => void;
  isOpen: boolean;
}

const SearchPanel: React.FC<ISearchPanel> = ({ onClose, isOpen }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { data: searchResults, isLoading, isError } = useSearch(debouncedSearchQuery);
  const router = useRouter();

  const handleSeeAll = () => {
    if (debouncedSearchQuery) {
      router.push(`/search/${debouncedSearchQuery}` as RelativePathString);
      onClose();
    }
  };

  return (
    <View
      className={`absolute top-0 left-0 w-full h-screen bg-white z-50 ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      } transition-transform`}
    >
      <View className="bg-white py-4 px-4">
        <View className="flex-row items-center justify-between pb-4 border-b border-gray-300 mb-6">
          <TextInput
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-[16px] text-black border-0"
          />
          <TouchableOpacity onPress={onClose} className="ml-3">
            <CloseIcon className="text-black" />
          </TouchableOpacity>
        </View>

        {searchResults && searchResults.length > 0 && (
          <Button
            text={`See all ${searchResults.length} results`}
            onPress={handleSeeAll}
            nameClass={EButtonClass.DEF}
            size={EButtonSize.LG}
          />
        )}

        <View className="mt-4">
          {isLoading && (
            <View className="mt-10">
              <Loading />
            </View>
          )}
          {isError && <ErrorFetch />}
          {!isLoading && !isError && (
            <>
              {searchResults && searchResults.length > 0 ? (
                <FlatList
                  data={searchResults.slice(0, 5)}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => <SearchPanelCard {...item} />}
                  contentContainerStyle={{ paddingBottom: 16 }}
                />
              ) : (
                <NothingMessage text="Nothing was found for your request" />
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default SearchPanel;
