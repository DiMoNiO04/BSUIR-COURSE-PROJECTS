import React from 'react';
import styles from './ModeratorCategories.module.scss';
import { useGetCategories } from '@/api/hooks';
import { Button, ErrorFetch, Loading, NothingMessage } from '@/components/ui';
import { CategorieModerCard } from '@/components/cards';
import { EButtonClass, EButtonSize, EButtonType, EUrls } from '@/utils';

const ModeratorCategories: React.FC = () => {
  const { data: categories, isLoading, isError } = useGetCategories();

  return (
    <article>
      <div className={styles.titles}>
        <h2 className={styles.title}>Categories</h2>
        <Button
          text="Create new"
          nameClass={EButtonClass.SEC}
          size={EButtonSize.LG}
          typeBtn={EButtonType.BUTTON}
          isLink={true}
          linkUrl={EUrls.CREATE_CATEGORIE}
        />
      </div>

      {isError && <ErrorFetch />}
      {isLoading && <Loading />}

      {!isLoading &&
        !isError &&
        (categories && categories.length > 0 ? (
          <div className={styles.cards}>
            {categories.map((categorie) => (
              <CategorieModerCard key={categorie.id} {...categorie} />
            ))}
          </div>
        ) : (
          <NothingMessage text="No categories available at the moment!" />
        ))}
    </article>
  );
};

export default ModeratorCategories;
