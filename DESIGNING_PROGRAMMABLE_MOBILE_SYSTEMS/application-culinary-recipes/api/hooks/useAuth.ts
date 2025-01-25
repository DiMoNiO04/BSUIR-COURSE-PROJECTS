import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiEndpoints, EMethods, ROLE_KEY, TOKEN_KEY, TRY_AGAIN } from '@/utils';
import { IAuthCallbacks, IAuthResponse, IErrorResponse } from '../interfaces';
import { ILoginInputs } from '@/components/forms/loginForm/LoginForm';
import { ISignupInputs } from '@/components/forms/signUp/SignUp';

const useAuth = ({ onSuccess }: IAuthCallbacks) => {
  const [isFail, setIsFail] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string>('');

  const handleAuth = async (data: ILoginInputs | ISignupInputs, isLogin: boolean) => {
    const endpoint = isLogin ? ApiEndpoints.AUTH : ApiEndpoints.REGISTRATION;

    try {
      setIsFail(false);
      setNotificationMsg('');

      const response = await fetch(endpoint, {
        method: EMethods.POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData: IErrorResponse = await response.json();
        setIsFail(true);
        setNotificationMsg(errorData.message);
        return;
      }

      const result: IAuthResponse = await response.json();
      if (isLogin) {
        await AsyncStorage.setItem(TOKEN_KEY, result.token);
        await AsyncStorage.setItem(ROLE_KEY, result.role);
      }

      setIsFail(false);
      setNotificationMsg(result.message);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      setIsFail(true);
      setNotificationMsg(TRY_AGAIN);
    }
  };

  return { handleAuth, isFail, notificationMsg };
};

export default useAuth;
