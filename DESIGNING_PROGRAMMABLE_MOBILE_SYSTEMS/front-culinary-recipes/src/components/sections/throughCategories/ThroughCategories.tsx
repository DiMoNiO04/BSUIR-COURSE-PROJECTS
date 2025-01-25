import React from 'react';
import { ErrorFetch, Loading, NothingMessage, TitleSection } from '@/components/ui';
import { CategorieCard } from '@/components/cards';
import { useGetCategories } from '@/api/hooks';
import styles from './ThroughCategories.module.scss';
import { EUrls } from '@/utils';

const ThroughCategories: React.FC = () => {
  const { data: categories, isLoading, isError } = useGetCategories();

  return (
    <section>
      <div className="container">
        <TitleSection title="Categories" linkTxt="View All" link={EUrls.CATEGORIES} />

        {isLoading && <Loading />}
        {isError && <ErrorFetch />}

        {!isLoading &&
          !isError &&
          (categories && categories.length > 0 ? (
            <div className={styles.cards}>
              {categories.slice(0, 6).map((categorie) => (
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

export default ThroughCategories;
