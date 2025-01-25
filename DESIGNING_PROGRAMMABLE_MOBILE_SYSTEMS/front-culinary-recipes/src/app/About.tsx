import React from 'react';
import { Helmet } from 'react-helmet';
import { AboutMain, Operating, SimpleRecipes, TalentTeam } from '@/components/sections';
import { EUrls, FRONT_URL } from '@/utils';

const AboutPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Tastebite</title>
        <meta
          name="description"
          content="Discover more about our mission, team, and the story behind our recipes. Learn how we bring simple, delicious recipes to your table."
        />
        <link rel="canonical" href={`${FRONT_URL}${EUrls.ABOUT}`} />
      </Helmet>
      <main>
        <AboutMain />
        <SimpleRecipes />
        <TalentTeam />
        <Operating />
      </main>
    </>
  );
};

export default AboutPage;
