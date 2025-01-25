import React from 'react';
import { Helmet } from 'react-helmet';
import { EUrls, FRONT_URL } from '@/utils';
import { ModeratorPanel } from '@/components/sections/moderator';

const ModeratorCategoriesPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Moderator Categories | Tastebite</title>
        <link rel="canonical" href={`${FRONT_URL}${EUrls.MODERATOR_CATEGORIES}`} />
      </Helmet>
      <main>
        <ModeratorPanel />
      </main>
    </>
  );
};

export default ModeratorCategoriesPage;
