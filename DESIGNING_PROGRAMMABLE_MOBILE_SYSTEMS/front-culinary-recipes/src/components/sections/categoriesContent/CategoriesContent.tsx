import React from 'react';
import { CategorieCard } from '@/components/cards';
import { useGetCategories } from '@/api/hooks';
import styles from './CategoriesContent.module.scss';
import { ErrorFetch, Loading, NothingMessage } from '@/components/ui';

const CategoriesContent: React.FC = () => {
  const { data: categories, isLoading, isError } = useGetCategories();

  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>Categories</h1>

        {isError && <ErrorFetch />}
        {isLoading && <Loading />}

        {!isLoading &&
          !isError &&
          (categories && categories.length > 0 ? (
            <div className={styles.cards}>
              {categories.map((categorie) => (
                <CategorieCard key={categorie.id} name={categorie.name} image={categorie.image} />
              ))}
            </div>
          ) : (
            <NothingMessage text="No categories available at the moment. Please check back later!" />
          ))}
      </div>
    </section>
  );
};

export default CategoriesContent;
