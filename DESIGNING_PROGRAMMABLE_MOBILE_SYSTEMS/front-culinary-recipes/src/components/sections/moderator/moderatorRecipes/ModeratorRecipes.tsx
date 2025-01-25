import React, { useState } from 'react';
import styles from './ModeratorRecipes.module.scss';
import { useGetAllRecipes } from '@/api/hooks';
import { ErrorFetch, Loading, NothingMessage, Select } from '@/components/ui';
import { useDebounce, useSortRecipes } from '@/hooks';
import { IRecipe } from '@/api';
import { sortRecipes } from '@/data';
import { ModerRecipeCard } from '@/components/cards';

const ModeratorRecipes: React.FC = () => {
  const { data: recipes, isLoading, isError } = useGetAllRecipes();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filteredRecipes =
    recipes?.filter((recipe: IRecipe) => recipe.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())) || [];

  const { sortOption, handleSortChange, sortedRecipes } = useSortRecipes(filteredRecipes);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const publishedRecipes = sortedRecipes().filter((recipe) => recipe.isPublished);
  const unpublishedRecipes = sortedRecipes().filter((recipe) => !recipe.isPublished);

  return (
    <article>
      <h2 className={styles.title}>Recipes</h2>

      <div className={styles.searchSortContainer}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className={styles.searchInput}
        />
        <div className={styles.sortContainer}>
          <span>{`(${filteredRecipes.length} recipes)`}</span>
          <Select name="sort" value={sortOption} onChange={handleSortChange} options={sortRecipes} />
        </div>
      </div>

      {isError && <ErrorFetch />}
      {isLoading && <Loading />}

      {!isLoading && !isError && (
        <div>
          {publishedRecipes.length > 0 && (
            <div className={styles.block}>
              <h3 className={styles.titleBlock}>Published Recipes</h3>
              <div className={styles.cards}>
                {publishedRecipes.map((recipe) => (
                  <ModerRecipeCard key={recipe.id} {...recipe} />
                ))}
              </div>
            </div>
          )}

          {unpublishedRecipes.length > 0 && (
            <div className={styles.block}>
              <h3 className={styles.titleBlock}>Unpublished Recipes</h3>
              <div className={styles.cards}>
                {unpublishedRecipes.map((recipe) => (
                  <ModerRecipeCard key={recipe.id} {...recipe} />
                ))}
              </div>
            </div>
          )}

          {unpublishedRecipes.length === 0 && publishedRecipes.length === 0 && <NothingMessage text="No recipes!" />}
        </div>
      )}
    </article>
  );
};

export default ModeratorRecipes;
