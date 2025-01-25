import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthToken } from '@/hooks';
import { EUrls } from '@/utils';

const ProtectedAuth: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const { token, role } = useAuthToken();

  useEffect(() => {}, [token, role]);

  if (!token) {
    return <Navigate to={EUrls.MAIN} />;
  }

  return element;
};

export default ProtectedAuth;
