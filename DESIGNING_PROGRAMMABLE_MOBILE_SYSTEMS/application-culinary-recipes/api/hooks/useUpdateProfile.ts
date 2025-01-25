import { useState } from 'react';
import { ApiEndpoints, EMethods, TOKEN_KEY, TOKEN_NOT_FOUND, TRY_AGAIN } from '@/utils';
import { mutate } from 'swr';
import apiRequest from '../apiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUpdateProfile = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string>('');

  const handleUpdateUser = async (firstName: string, lastName: string) => {
    setIsError(false);

    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) {
        throw new Error(TOKEN_NOT_FOUND);
      }

      const body = { firstName, lastName };
      const result = await apiRequest(ApiEndpoints.UPDATE_PERSONAL_DATA, EMethods.PATCH, body, token);

      mutate([ApiEndpoints.GET_PERSONAL_DATA, token]);

      setNotificationMsg(result.message);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setNotificationMsg(TRY_AGAIN);
    }
  };

  return { handleUpdateUser, isError, notificationMsg };
};

export default useUpdateProfile;
