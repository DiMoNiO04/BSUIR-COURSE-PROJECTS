import React from 'react';
import { Helmet } from 'react-helmet';
import { EUrls, FRONT_URL } from '@/utils';
import { ModeratorPanel } from '@/components/sections/moderator';

const ModeratorRecipesPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Moderator Recipes | Tastebite</title>
        <link rel="canonical" href={`${FRONT_URL}${EUrls.MODERATOR_RECIPES}`} />
      </Helmet>
      <main>
        <ModeratorPanel />
      </main>
    </>
  );
};

export default ModeratorRecipesPage;
