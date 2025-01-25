import React from 'react';
import { Helmet } from 'react-helmet';
import { EUrls, FRONT_URL } from '@/utils';
import { RecipesUser } from '@/components/sections';

const RecipesUserPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>My Recipes | Tastebite</title>
        <meta
          name="description"
          content="Discover and manage your personal recipes on Tastebite. Easily add, edit, and delete recipes while exploring delicious options for every meal. Join us for a seamless cooking experience!"
        />
        <link rel="canonical" href={`${FRONT_URL}${EUrls.PROFILE_RECIPES}`} />
      </Helmet>
      <main>
        <RecipesUser />
      </main>
    </>
  );
};

export default RecipesUserPage;
