import React, { useState } from 'react';
import styles from './RecipesContent.module.scss';
import { useGetRecipes } from '@/api/hooks';
import { IRecipe } from '@/api';
import { RecipeCard } from '@/components/cards';
import { ErrorFetch, Loading, Select, NothingMessage } from '@/components/ui';
import { useDebounce, useSortRecipes } from '@/hooks';
import { sortRecipes } from '@/data';

const RecipesContent: React.FC = () => {
  const { data: recipes, isLoading, isError } = useGetRecipes();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filteredRecipes =
    recipes?.filter((recipe: IRecipe) => recipe.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())) || [];

  const { sortOption, handleSortChange, sortedRecipes } = useSortRecipes(filteredRecipes);

  const categorizedRecipes = sortedRecipes().reduce((acc: Record<string, IRecipe[]>, recipe: IRecipe) => {
    const categoryName = recipe.category?.name || 'Other';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(recipe);
    return acc;
  }, {});

  const sortedCategories = Object.keys(categorizedRecipes || {}).sort();

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>Recipes</h1>

        {isError && <ErrorFetch />}
        {isLoading && <Loading />}

        {!isLoading && !isError && (
          <>
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

            {filteredRecipes.length > 0 ? (
              <div className={styles.blocks}>
                {sortedCategories.map((category) => (
                  <div key={category} className={styles.block}>
                    <h2 className={styles.subtitle}>{category}</h2>
                    <div className={styles.cards}>
                      {categorizedRecipes[category].map((card) => (
                        <RecipeCard {...card} key={card.id} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <NothingMessage text="No recipes found for your search." />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default RecipesContent;
