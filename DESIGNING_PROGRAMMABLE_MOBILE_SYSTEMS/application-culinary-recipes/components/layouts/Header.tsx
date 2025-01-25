import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LogoIcon, SearchIcon } from '@/components/icons';
import { MenuHeader, UserProfile, BurgerBtn } from '@/components/elements';
import { Socials } from '@/components/ui';
import { useHeader } from '@/hooks';
import SearchPanel from './SearchPanel';
import { router } from 'expo-router';

const Header: React.FC = () => {
  const { isScrolled, isOpenBurger, handleBurgerToggle } = useHeader();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const handleSearchToggle = () => setIsSearchOpen((prev) => !prev);

  return (
    <View className={`top-0 left-0 w-full z-10 bg-greyLight ${isScrolled || (isOpenBurger && 'bg-greyLight')}`}>
      <View className="flex flex-row justify-between items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.push('/')}>
          <LogoIcon />
        </TouchableOpacity>

        <View className="flex flex-row items-center gap-x-6">
          <TouchableOpacity onPress={handleSearchToggle} className="w-6 h-6 flex items-center justify-center">
            <SearchIcon className="w-full h-full" />
          </TouchableOpacity>
          <UserProfile />
          <BurgerBtn isOpen={isOpenBurger} onClick={handleBurgerToggle} />
        </View>
      </View>

      {isSearchOpen && <SearchPanel onClose={handleSearchToggle} isOpen={isSearchOpen} />}

      {isOpenBurger && (
        <View className="bg-greyLight flex flex-col items-center px-4 py-6 space-y-4 absolute top-24 left-0 w-full">
          <MenuHeader />
          <Socials />
        </View>
      )}
    </View>
  );
};

export default Header;
