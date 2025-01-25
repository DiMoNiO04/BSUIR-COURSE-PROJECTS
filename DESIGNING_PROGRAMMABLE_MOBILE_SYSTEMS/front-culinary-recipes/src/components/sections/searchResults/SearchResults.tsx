import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipesCardsList } from '@/components/elements';
import { Select, ErrorFetch, NothingMessage } from '@/components/ui';
import { useSearch } from '@/api/hooks';
import { useDebounce, useSortRecipes } from '@/hooks';
import { sortRecipes } from '@/data';
import styles from './SearchResults.module.scss';

const SearchResults: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get('title') || '';

  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { data: searchResults, isLoading, isError } = useSearch(debouncedSearchQuery);

  const { sortOption, handleSortChange, sortedRecipes } = useSortRecipes(searchResults || []);

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>Search Results</h1>

        <div className={styles.block}>
          <input
            type="text"
            placeholder="Search..."
            autoComplete="off"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <div className={styles.sortContainer}>
            <span>{`(${searchResults ? searchResults.length : 0} recipes)`}</span>
            {searchResults && (
              <Select name="sort" value={sortOption} onChange={handleSortChange} options={sortRecipes} />
            )}
          </div>
        </div>

        {isError && <ErrorFetch />}
        {!isLoading && !isError && searchResults && searchResults.length > 0 ? (
          <RecipesCardsList
            cards={sortedRecipes()}
            isLoading={isLoading}
            isError={isError}
            msg="Nothing was found for your request"
          />
        ) : (
          <NothingMessage text="Nothing was found for your request" />
        )}
      </div>
    </section>
  );
};

export default SearchResults;
