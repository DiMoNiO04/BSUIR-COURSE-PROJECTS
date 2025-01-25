import React from 'react';
import { TitleSection } from '@/components/ui';
import { RecipesCardsList } from '@/components/elements';
import { EUrls } from '@/utils';
import { useGetRecipes } from '@/api/hooks';

const LatestRecipes: React.FC = () => {
  const { data: recipes, isError, isLoading, message } = useGetRecipes();

  const sortedRecipes = recipes
    ? [...recipes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 15)
    : [];

  return (
    <section>
      <div className="container">
        <TitleSection title="Latest Recipes" linkTxt="View All" link={EUrls.RECIPES} />
        <RecipesCardsList cards={sortedRecipes} isLoading={isLoading} isError={isError} msg={message} />
      </div>
    </section>
  );
};

export default LatestRecipes;
