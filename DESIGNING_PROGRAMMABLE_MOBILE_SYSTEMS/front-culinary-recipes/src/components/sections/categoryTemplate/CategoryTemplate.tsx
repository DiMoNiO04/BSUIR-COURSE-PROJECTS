import React from 'react';
import { Select, ErrorFetch, Loading, NothingMessage } from '@/components/ui';
import styles from './CategoryTemplate.module.scss';
import { ICategory } from '@/api';
import { RecipesCardsList } from '@/components/elements';
import { useSortRecipes } from '@/hooks';
import { sortRecipes } from '@/data';
import { useGetCategoryRecipes } from '@/api/hooks';
import { useParams } from 'react-router-dom';

interface ICategoryTemplate {
  category: ICategory | null;
  isError: boolean;
  isLoading: boolean;
}

const CategoryTemplate: React.FC<ICategoryTemplate> = ({ category, isError, isLoading }) => {
  const { name } = useParams<{ name: string }>();
  const {
    data: recipes,
    isError: isErrorRecipes,
    isLoading: isLoadingRecipes,
    message: messageRecipes,
  } = useGetCategoryRecipes(String(name));
  const { sortOption, handleSortChange, sortedRecipes } = useSortRecipes(recipes || []);

  return (
    <>
      <section className={styles.sectionFirst}>
        <img
          src="/img/templates/category.webp"
          alt={category ? category.name : 'Category Image'}
          width={1920}
          height={300}
        />
      </section>

      <section className={styles.sections}>
        <div className="container">
          {isLoading && <Loading />}
          {isError && <ErrorFetch />}

          {!isLoading && !isError && category ? (
            <>
              <div className={styles.block}>
                <div className={styles.titles}>
                  <div className={styles.titleBlock}>
                    <h1 className={styles.title}>{category.name}</h1>
                    <span>({recipes?.length || 0} Recipes)</span>
                  </div>
                  <div className={styles.subtitle}>{category.description}</div>
                </div>
                {recipes && recipes.length > 1 && (
                  <Select name="sort" value={sortOption} onChange={handleSortChange} options={sortRecipes} />
                )}
              </div>

              <RecipesCardsList
                cards={sortedRecipes()}
                isLoading={isLoadingRecipes}
                isError={isErrorRecipes}
                msg={messageRecipes}
              />
            </>
          ) : (
            !isLoading && !isError && <NothingMessage text="Category not found." />
          )}
        </div>
      </section>
    </>
  );
};

export default CategoryTemplate;
