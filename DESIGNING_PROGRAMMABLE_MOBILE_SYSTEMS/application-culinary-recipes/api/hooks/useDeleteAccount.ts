import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiEndpoints, EMethods, TOKEN_KEY, TOKEN_NOT_FOUND, TRY_AGAIN } from '@/utils';
import apiRequest from '../apiRequest';

const useDeleteAccount = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string>('');

  const handleDeleteAccount = async () => {
    setIsError(false);

    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);

      if (!token) {
        throw new Error(TOKEN_NOT_FOUND);
      }

      const result = await apiRequest(ApiEndpoints.DELETE_MY_ACC, EMethods.DELETE, undefined, token);

      await AsyncStorage.removeItem(TOKEN_KEY);
      setNotificationMsg(result.message);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setNotificationMsg(TRY_AGAIN);
    }
  };

  return { handleDeleteAccount, isError, notificationMsg };
};

export default useDeleteAccount;
