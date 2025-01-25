import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiEndpoints, EMethods, TOKEN_KEY, TOKEN_NOT_FOUND, TRY_AGAIN } from '@/utils';
import { IErrorResponse } from '../interfaces';

const useChangePassword = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string>('');

  const handleChangePassword = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
    try {
      setIsError(false);
      setNotificationMsg('');

      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) {
        setIsError(true);
        setNotificationMsg(TOKEN_NOT_FOUND);
        return;
      }

      const response = await fetch(ApiEndpoints.CHANGE_PASSWORD, {
        method: EMethods.PATCH,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      if (!response.ok) {
        const errorData: IErrorResponse = await response.json();
        setIsError(true);
        setNotificationMsg(errorData.message);
        return;
      }

      const result = await response.json();
      setIsError(false);
      setNotificationMsg(result.message);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setNotificationMsg(TRY_AGAIN);
    }
  };

  return { handleChangePassword, isError, notificationMsg };
};

export default useChangePassword;
