import React from 'react';
import { Helmet } from 'react-helmet';
import { AdminPanel } from '@/components/sections/admin';
import { EUrls, FRONT_URL } from '@/utils';

const AdminRolesPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Admin Roles | Tastebite</title>
        <link rel="canonical" href={`${FRONT_URL}${EUrls.ADMIN_ROLES}`} />
      </Helmet>
      <main>
        <AdminPanel />
      </main>
    </>
  );
};

export default AdminRolesPage;
