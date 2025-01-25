import React from 'react';
import { Helmet } from 'react-helmet';
import { SearchResults } from '@/components/sections';
import { EUrls, FRONT_URL } from '@/utils';

const SearchPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Search Results | TasteBite</title>
        <meta
          name="description"
          content="Explore the search results for your queries, find recipes, and discover new culinary ideas."
        />
        <link rel="canonical" href={`${FRONT_URL}${EUrls.SEARCH}`} />
      </Helmet>
      <main>
        <SearchResults />
      </main>
    </>
  );
};

export default SearchPage;
