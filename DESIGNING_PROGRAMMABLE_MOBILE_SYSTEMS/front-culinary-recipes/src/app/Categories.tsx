import React from 'react';
import { Helmet } from 'react-helmet';
import { CategoriesContent } from '@/components/sections';
import { EUrls, FRONT_URL } from '@/utils';

const CategoriesPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Categories | Tastebite</title>
        <meta
          name="description"
          content="Browse our diverse recipe categories and find the perfect dish to suit any occasion. From appetizers to desserts, we have it all."
        />
        <link rel="canonical" href={`${FRONT_URL}${EUrls.CATEGORIES}`} />
      </Helmet>
      <main>
        <CategoriesContent />
      </main>
    </>
  );
};

export default CategoriesPage;
