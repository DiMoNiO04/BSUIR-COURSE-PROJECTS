import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { ApiEndpoints, EMethods, TOKEN_KEY, TOKEN_NOT_FOUND, TRY_AGAIN } from '@/utils';
import apiRequest from '../apiRequest';
import { mutate } from 'swr';

const useBanUser = () => {
  const [cookies] = useCookies([TOKEN_KEY]);
  const [isError, setIsError] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string>('');

  const handleBanUser = async (userId: number, reason: string, isBan: boolean) => {
    setIsError(false);
    setNotificationMsg('');

    try {
      const token = cookies[TOKEN_KEY];

      if (!token) {
        throw new Error(TOKEN_NOT_FOUND);
      }

      const body = { userId, reason };

      const endpoint = isBan ? ApiEndpoints.BAN_USER : `${ApiEndpoints.UNBAN_USER}/${userId}`;

      const result = await apiRequest(endpoint, EMethods.POST, body, token);
      setNotificationMsg(result.message);
      mutate([ApiEndpoints.GET_USERS, token]);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setNotificationMsg(TRY_AGAIN);
    }
  };

  return { handleBanUser, isError, notificationMsg };
};

export default useBanUser;
