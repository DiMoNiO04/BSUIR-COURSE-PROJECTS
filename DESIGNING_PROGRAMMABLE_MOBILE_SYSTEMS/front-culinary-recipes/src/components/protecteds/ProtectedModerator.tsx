import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthToken } from '@/hooks';
import ERoles from '@/utils/enums/roles';
import { EUrls } from '@/utils';

const ProtectedModerator: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const { token, role } = useAuthToken();

  useEffect(() => {}, [token, role]);

  if (!token || role !== ERoles.MODERATOR) {
    return <Navigate to={EUrls.MAIN} />;
  }

  return element;
};

export default ProtectedModerator;
