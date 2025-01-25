import React from 'react';
import { Helmet } from 'react-helmet';
import { FavoritesContent } from '@/components/sections';
import { EUrls, FRONT_URL } from '@/utils';

const FavoritesPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Favorites | TasteBite</title>
        <meta
          name="description"
          content="Access your saved recipes all in one place. Discover your favorite dishes and easily manage your collection."
        />
        <link rel="canonical" href={`${FRONT_URL}${EUrls.FAVORITES}`} />
      </Helmet>
      <main>
        <FavoritesContent />
      </main>
    </>
  );
};

export default FavoritesPage;
