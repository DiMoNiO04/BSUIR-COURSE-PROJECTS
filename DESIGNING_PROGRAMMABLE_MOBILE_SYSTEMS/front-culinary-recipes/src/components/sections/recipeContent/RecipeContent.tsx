import React from 'react';
import { InfoRecipe, Ingredients, Insruction } from '@/components/elements';
import { RecipeTop } from '..';
import styles from './RecipeContent.module.scss';
import { IRecipe } from '@/api';
import { ErrorFetch, Loading, NothingMessage } from '@/components/ui';
import { ON_MODERATION } from '@/utils';

interface IRecipeContent {
  recipe: IRecipe | null;
  isError: boolean;
  isLoading: boolean;
}

const RecipeContent: React.FC<IRecipeContent> = ({ recipe, isError, isLoading }) => {
  if (isError) return <ErrorFetch />;
  if (isLoading) return <Loading />;
  if (!recipe) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        {recipe.isPublished ? (
          <>
            <RecipeTop
              id={recipe.id}
              title={recipe.title}
              shortDescription={recipe.shortDescription}
              image={recipe.image}
              author={recipe.author}
              category={recipe.category!.name}
              createdAt={recipe.createdAt}
            />
            <div className={styles.info}>
              <InfoRecipe calories={recipe.calories} cookingTime={recipe.cookingTime} />
              <div className={styles.content}>
                <Ingredients ingredients={recipe.ingredients} />
                <Insruction instructions={recipe.instructions} />
              </div>
            </div>
          </>
        ) : (
          <NothingMessage text={ON_MODERATION} />
        )}
      </div>
    </section>
  );
};

export default RecipeContent;
