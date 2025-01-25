import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiEndpoints, EFavoriteActionType, EMethods, TOKEN_KEY, TOKEN_NOT_FOUND, TRY_AGAIN } from '@/utils';
import apiRequest from '../apiRequest';
import { mutate } from 'swr';

const useFavorites = (actionType: EFavoriteActionType, id?: string) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string>('');

  const executeFavoriteAction = async () => {
    setIsError(false);
    setNotificationMsg('');

    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) {
        throw new Error(TOKEN_NOT_FOUND);
      }

      let endpoint: string;
      let method: EMethods;

      if (actionType === EFavoriteActionType.ADD) {
        if (!id) throw new Error('ID is required for adding a favorite');
        endpoint = `${ApiEndpoints.ADD_FAVORITE}/${id}`;
        method = EMethods.POST;
      } else if (actionType === EFavoriteActionType.REMOVE) {
        if (!id) throw new Error('ID is required for removing a favorite');
        endpoint = `${ApiEndpoints.DELETE_FAVORITE}/${id}`;
        method = EMethods.DELETE;
      } else if (actionType === EFavoriteActionType.DELETE_ALL) {
        endpoint = ApiEndpoints.DELETE_ALL_FAVORITES;
        method = EMethods.DELETE;
      } else {
        throw new Error('Invalid action type');
      }

      const result = await apiRequest(endpoint, method, undefined, token);
      setNotificationMsg(result.message);

      mutate([ApiEndpoints.GET_FAVORITES, token]);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setNotificationMsg(TRY_AGAIN);
    }
  };

  return { executeFavoriteAction, isError, notificationMsg };
};

export default useFavorites;
