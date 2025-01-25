import React from 'react';
import styles from './RecipesUser.module.scss';
import { useGetMyRecipes } from '@/api/hooks';
import { Button, ErrorFetch, Loading, NothingMessage } from '@/components/ui';
import { MyRecipeCard } from '@/components/cards';
import { EButtonClass, EButtonSize, EButtonType, EUrls } from '@/utils';

const RecipesUser: React.FC = () => {
  const { data: recipes, isLoading, isError } = useGetMyRecipes();

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.titles}>
          <h1>My Recipes</h1>
          <Button
            text="Create new"
            nameClass={EButtonClass.SEC}
            size={EButtonSize.LG}
            typeBtn={EButtonType.BUTTON}
            isLink={true}
            linkUrl={EUrls.CREATE_RECIPE}
          />
        </div>

        {isError && <ErrorFetch />}
        {isLoading && <Loading />}

        {!isLoading && !isError && (
          <>
            {recipes && recipes.length > 0 ? (
              <div className={styles.cards}>
                {recipes.map((recipe) => (
                  <MyRecipeCard key={recipe.id} {...recipe} />
                ))}
              </div>
            ) : (
              <NothingMessage text="You have no added recipes!" />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default RecipesUser;
