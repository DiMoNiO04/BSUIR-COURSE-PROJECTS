import React from 'react';
import { Helmet } from 'react-helmet';
import { LatestRecipes, ThroughCategories, ShareYourRecipe, Slider, SuperDelicious } from '@/components/sections';
import { FRONT_URL } from '@/utils';

const MainPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>TasteBite</title>
        <meta
          name="description"
          content="Explore our curated collection of recipes, discover popular categories, and get inspired to share your favorite dishes."
        />
        <link rel="canonical" href={FRONT_URL} />
      </Helmet>
      <main>
        <Slider />
        <ThroughCategories />
        <SuperDelicious />
        <ShareYourRecipe />
        <LatestRecipes />
      </main>
    </>
  );
};

export default MainPage;
