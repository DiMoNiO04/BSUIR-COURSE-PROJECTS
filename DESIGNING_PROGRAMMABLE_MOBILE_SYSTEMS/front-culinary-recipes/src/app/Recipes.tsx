import React from 'react';
import { Helmet } from 'react-helmet';
import { EUrls, FRONT_URL } from '@/utils';
import { RecipesContent } from '@/components/sections';

const RecipesPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Recipes | Tastebite</title>
        <meta
          name="description"
          content="Explore a variety of delicious recipes on Tastebite, from quick snacks to gourmet meals. Find inspiration for every occasion and make cooking simple and enjoyable with our easy-to-follow recipes."
        />
        <link rel="canonical" href={`${FRONT_URL}${EUrls.RECIPES}`} />
      </Helmet>
      <main>
        <RecipesContent />
      </main>
    </>
  );
};

export default RecipesPage;
