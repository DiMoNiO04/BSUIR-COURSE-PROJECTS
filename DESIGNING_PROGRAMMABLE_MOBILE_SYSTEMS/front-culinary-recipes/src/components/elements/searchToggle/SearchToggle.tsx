import React, { useState } from 'react';
import { SearchIcon } from '@/components/icons';
import { SearchPanel } from '@/components/layouts';
import { useOverflow } from '@/hooks';
import { EButtonType } from '@/utils';
import styles from './SearchToggle.module.scss';

const SearchToggle: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchToggle = () => setIsSearchOpen((prev) => !prev);

  useOverflow(isSearchOpen);

  return (
    <>
      <button type={EButtonType.BUTTON} className={styles.searchBtn} onClick={handleSearchToggle}>
        <SearchIcon />
      </button>
      <SearchPanel onClose={handleSearchToggle} isOpen={isSearchOpen} />
    </>
  );
};

export default SearchToggle;
