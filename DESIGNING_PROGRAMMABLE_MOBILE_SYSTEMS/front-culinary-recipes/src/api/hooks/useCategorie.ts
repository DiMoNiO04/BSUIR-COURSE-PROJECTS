import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { ApiEndpoints, EActionType, EMethods, TOKEN_KEY, TOKEN_NOT_FOUND, TRY_AGAIN } from '@/utils';
import apiRequest from '../apiRequest';
import { mutate } from 'swr';
import { ICategorieInputs } from '@/components/forms';

const useCategorie = (actionType: EActionType, categorieName?: string) => {
  const [cookies] = useCookies([TOKEN_KEY]);
  const [isError, setIsError] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string>('');

  const submitCategorie = async (categorieData?: ICategorieInputs) => {
    setIsError(false);

    try {
      const token = cookies[TOKEN_KEY];
      if (!token) {
        throw new Error(TOKEN_NOT_FOUND);
      }

      let endpoint: string;
      let method: EMethods;

      if (actionType === EActionType.CREATE) {
        endpoint = ApiEndpoints.CREATE_CATEGORIE;
        method = EMethods.POST;
      } else if (actionType === EActionType.UPDATE) {
        endpoint = `${ApiEndpoints.UPDATE_CATEGORIE}/${categorieName}`;
        method = EMethods.PATCH;
      } else if (actionType === EActionType.DELETE) {
        endpoint = `${ApiEndpoints.DELETE_CATEGORIE}/${categorieName}`;
        method = EMethods.DELETE;
      } else {
        throw new Error('Invalid action type');
      }

      const result = await apiRequest(endpoint, method, categorieData, token);
      setNotificationMsg(result.message);
      mutate(ApiEndpoints.GET_CATEGORIES);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setNotificationMsg(TRY_AGAIN);
    }
  };

  return { submitCategorie, isError, notificationMsg };
};

export default useCategorie;
