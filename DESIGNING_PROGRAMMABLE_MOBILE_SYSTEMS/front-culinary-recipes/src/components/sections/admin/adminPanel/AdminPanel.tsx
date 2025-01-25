import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminRoles, AdminUsers } from '..';
import { AdminModerMain } from '@/components/layouts';
import { EUrls } from '@/utils';

const AdminPanel: React.FC = () => {
  const tabButtons = [
    { label: 'Users', value: 'users/' },
    { label: 'Roles', value: 'roles/' },
  ];

  const tabContents = {
    users: <AdminUsers />,
    roles: <AdminRoles />,
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<AdminModerMain title="Admin Panel" role="ADMIN" tabContents={tabContents} tabButtons={tabButtons} />}
      >
        <Route path={EUrls.ADMIN_USERS} element={<AdminUsers />} />
        <Route path={EUrls.ADMIN_ROLES} element={<AdminRoles />} />
      </Route>
    </Routes>
  );
};

export default AdminPanel;
