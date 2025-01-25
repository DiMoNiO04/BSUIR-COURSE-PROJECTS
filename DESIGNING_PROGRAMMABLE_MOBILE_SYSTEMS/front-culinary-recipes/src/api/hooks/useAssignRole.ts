import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { ApiEndpoints, EMethods, TOKEN_KEY, TOKEN_NOT_FOUND, TRY_AGAIN } from '@/utils';
import apiRequest from '../apiRequest';
import { mutate } from 'swr';

const useAssignRole = () => {
  const [cookies] = useCookies([TOKEN_KEY]);
  const [isError, setIsError] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string>('');

  const handleAssignRole = async (userId: number, newRoleId: number) => {
    setIsError(false);

    try {
      const token = cookies[TOKEN_KEY];

      if (!token) {
        throw new Error(TOKEN_NOT_FOUND);
      }

      const body = { userId, newRoleId };

      const result = await apiRequest(ApiEndpoints.ASSIGN_ROLE, EMethods.PATCH, body, token);
      setNotificationMsg(result.message);
      mutate([ApiEndpoints.GET_USERS, token]);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setNotificationMsg(TRY_AGAIN);
    }
  };

  return { handleAssignRole, isError, notificationMsg };
};

export default useAssignRole;
