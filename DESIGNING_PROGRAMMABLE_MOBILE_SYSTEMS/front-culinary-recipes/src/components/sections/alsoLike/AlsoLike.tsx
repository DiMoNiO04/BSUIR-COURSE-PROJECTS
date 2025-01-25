import React from 'react';
import { ErrorFetch, Loading, NothingMessage, TitleSection } from '@/components/ui';
import { RecipesCardsList } from '@/components/elements';
import { useGetCategoryRecipes } from '@/api/hooks';

interface IAlsoLike {
  idRecipe: number;
  category: string;
}

const AlsoLike: React.FC<IAlsoLike> = ({ idRecipe, category }) => {
  const { data: recipes, isError, isLoading, message } = useGetCategoryRecipes(String(category));

  const filteredRecipes = recipes?.filter((recipe) => recipe.id !== idRecipe) || [];

  if (filteredRecipes.length < 0) return null;

  return (
    <section>
      <div className="container">
        <TitleSection title="You might also like" />

        {isLoading && <Loading />}
        {isError && <ErrorFetch />}

        {!isLoading && !isError && filteredRecipes.length > 0 ? (
          <RecipesCardsList cards={filteredRecipes.slice(0, 7)} isLoading={isLoading} isError={isError} msg={message} />
        ) : (
          !isLoading && !isError && <NothingMessage text={message!} />
        )}
      </div>
    </section>
  );
};

export default AlsoLike;
