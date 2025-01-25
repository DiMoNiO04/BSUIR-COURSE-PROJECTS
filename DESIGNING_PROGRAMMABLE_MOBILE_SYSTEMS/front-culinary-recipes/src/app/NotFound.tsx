import React from 'react';
import { Helmet } from 'react-helmet';
import { EUrls, FRONT_URL } from '@/utils';
import { NotFound } from '@/components/sections';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404 | Tastebite</title>
        <meta
          name="description"
          content="Oops! The page you are looking for does not exist. Please check the URL or return to the homepage for delicious recipes and culinary inspiration."
        />
        <link rel="canonical" href={`${FRONT_URL}${EUrls.MAIN}`} />
      </Helmet>
      <main>
        <NotFound />
      </main>
    </>
  );
};

export default NotFoundPage;
