import React from 'react';
import { Helmet } from 'react-helmet';
import { ProfileContent } from '@/components/sections';
import { EUrls, FRONT_URL } from '@/utils';

const ProfilePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>User Profile | TasteBite</title>
        <meta
          name="description"
          content="View and edit your profile information, manage your account settings, and access personalized content."
        />
        <link rel="canonical" href={`${FRONT_URL}${EUrls.PROFILE}`} />
      </Helmet>
      <main>
        <ProfileContent />
      </main>
    </>
  );
};

export default ProfilePage;
