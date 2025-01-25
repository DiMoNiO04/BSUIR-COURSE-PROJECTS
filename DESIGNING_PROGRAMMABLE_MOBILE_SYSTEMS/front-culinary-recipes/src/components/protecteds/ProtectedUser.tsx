import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthToken } from '@/hooks';
import { EUrls } from '@/utils';
import ERoles from '@/utils/enums/roles';

const ProtectedUser: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const { token, role } = useAuthToken();

  useEffect(() => {}, [token, role]);

  if (!token || role !== ERoles.USER) {
    return <Navigate to={EUrls.MAIN} />;
  }

  return element;
};

export default ProtectedUser;
