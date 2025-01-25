import { useState } from 'react';
import { ApiEndpoints, EActionType, EMethods, TOKEN_KEY, TOKEN_NOT_FOUND, TRY_AGAIN } from '@/utils';
import apiRequest from '../apiRequest';
import { mutate } from 'swr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IRecipeInputs } from '@/components/forms/recipeForm/RecipeForm';

const useRecipes = (actionType: EActionType, recipeId?: number) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string>('');

  const submitRecipe = async (recipeData?: IRecipeInputs) => {
    setIsError(false);

    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) {
        throw new Error(TOKEN_NOT_FOUND);
      }

      let endpoint: string;
      let method: EMethods;

      if (actionType === EActionType.CREATE) {
        endpoint = ApiEndpoints.CREATE_RECIPE;
        method = EMethods.POST;
      } else if (actionType === EActionType.UPDATE) {
        endpoint = `${ApiEndpoints.UPDATE_RECIPE}/${recipeId}`;
        method = EMethods.PATCH;
      } else if (actionType === EActionType.DELETE) {
        if (!recipeId) {
          throw new Error('Recipe ID is required for deletion');
        }
        endpoint = `${ApiEndpoints.DELETE_RECIPE}/${recipeId}`;
        method = EMethods.DELETE;
      } else {
        throw new Error('Invalid action type');
      }

      const result = await apiRequest(endpoint, method, recipeData, token);
      setNotificationMsg(result.message);
      mutate([ApiEndpoints.GET_MY_RECIPES, token]);
      mutate(ApiEndpoints.GET_ALL_RECIPES);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setNotificationMsg(TRY_AGAIN);
    }
  };

  return { submitRecipe, isError, notificationMsg };
};

export default useRecipes;
