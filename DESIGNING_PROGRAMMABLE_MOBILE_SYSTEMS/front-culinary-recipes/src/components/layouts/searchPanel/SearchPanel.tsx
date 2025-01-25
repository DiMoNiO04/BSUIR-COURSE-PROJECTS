import React, { useState } from 'react';
import { Button } from '@/components/ui';
import { CloseIcon } from '@/components/icons';
import { ErrorFetch, NothingMessage } from '@/components/ui';
import { EButtonClass, EButtonSize, EButtonType, EUrls } from '@/utils';
import { useSearch } from '@/api/hooks';
import { SearchPanelCard } from '@/components/cards';
import { useDebounce } from '@/hooks';
import styles from './SearchPanel.module.scss';

interface ISearchPanel {
  onClose: () => void;
  isOpen: boolean;
}

const SearchPanel: React.FC<ISearchPanel> = ({ onClose, isOpen }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { data: searchResults, isLoading, isError } = useSearch(debouncedSearchQuery);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value);

  const linkUrl: string = debouncedSearchQuery ? `${EUrls.SEARCH}?title=${debouncedSearchQuery}` : `${EUrls.SEARCH}`;

  return (
    <div className={`${styles.panel} ${isOpen && styles.open}`}>
      <div className="container">
        <div className={styles.container}>
          <div className={styles.block}>
            <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchInputChange} />
            <button type={EButtonType.BUTTON} onClick={onClose}>
              <CloseIcon />
            </button>
          </div>

          {isError && <ErrorFetch />}

          {!isLoading &&
            !isError &&
            (searchResults && searchResults.length > 0 ? (
              <div className={styles.cards}>
                {searchResults.slice(0, 16).map((recipe) => (
                  <SearchPanelCard {...recipe} key={recipe.id} />
                ))}
              </div>
            ) : (
              <NothingMessage text="Nothing was found for your request" />
            ))}

          {searchResults && searchResults.length > 0 && (
            <div className={styles.btn}>
              <Button
                text={`See all ${searchResults.length} results`}
                nameClass={EButtonClass.DEF}
                size={EButtonSize.SM}
                typeBtn={EButtonType.BUTTON}
                isLink={true}
                linkUrl={linkUrl}
                handle={onClose}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
