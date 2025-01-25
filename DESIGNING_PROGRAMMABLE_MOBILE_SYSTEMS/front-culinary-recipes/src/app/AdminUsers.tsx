import React from 'react';
import { Helmet } from 'react-helmet';
import { AdminPanel } from '@/components/sections/admin';
import { EUrls, FRONT_URL } from '@/utils';

const AdminUsersPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Admin Users | Tastebite</title>
        <link rel="canonical" href={`${FRONT_URL}${EUrls.ADMIN_USERS}`} />
      </Helmet>
      <main>
        <AdminPanel />
      </main>
    </>
  );
};

export default AdminUsersPage;
