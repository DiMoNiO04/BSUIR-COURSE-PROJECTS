import React from 'react';
import { ErrorFetch, Loading, NothingMessage, TitleSection } from '@/components/ui';
import { SuperDeliciousCard } from '@/components/cards';
import { useGetRecipes } from '@/api/hooks';
import styles from './SuperDelicious.module.scss';

const SuperDelicious: React.FC = () => {
  const { data: recipes, isError, isLoading, message } = useGetRecipes();

  return (
    <section>
      <div className="container">
        <TitleSection title="Super Delicious" />

        {isLoading && <Loading />}
        {isError && <ErrorFetch />}

        <div className={styles.cards}>
          {recipes ? (
            <>
              {recipes.slice(0, 6).map((card) => (
                <SuperDeliciousCard {...card} key={card.id} />
              ))}
            </>
          ) : (
            <NothingMessage text={message!} />
          )}
        </div>
      </div>
    </section>
  );
};

export default SuperDelicious;
