import { API_URL } from '../consts';

export const ApiEndpoints = {
  AUTH: `${API_URL}/auth/login`,
  REGISTRATION: `${API_URL}/auth/registration`,
  DELETE_MY_ACC: `${API_URL}/users/self/delete`,
  CHANGE_PASSWORD: `${API_URL}/users/self/change-password`,
  GET_PERSONAL_DATA: `${API_URL}/users/self/personal-data`,
  UPDATE_PERSONAL_DATA: `${API_URL}/users/self/update-profile`,
  GET_USERS: `${API_URL}/users/get`,
  GET_FAVORITES: `${API_URL}/favorites/get`,
  DELETE_ALL_FAVORITES: `${API_URL}/favorites/remove-all`,
  DELETE_FAVORITE: `${API_URL}/favorites/remove`,
  ADD_FAVORITE: `${API_URL}/favorites/add`,
  GET_RECIPES: `${API_URL}/recipes/getPublished`,
  SEARCH: `${API_URL}/recipes/search`,
  GET_ALL_RECIPES: `${API_URL}/recipes/getAll`,
  GET_RECIPE: `${API_URL}/recipes/getOne/`,
  GET_MY_RECIPES: `${API_URL}/recipes/myRecipes`,
  DELETE_RECIPE: `${API_URL}/recipes/delete`,
  CREATE_RECIPE: `${API_URL}/recipes/create`,
  UPDATE_RECIPE: `${API_URL}/recipes/update`,
  TOGGLE_PUBLISH_RECIPE: `${API_URL}/recipes/toggle-publish`,
  GET_CATEGORIES: `${API_URL}/categories/getAllCategories`,
  GET_CATEGORY: `${API_URL}/categories/getCategory/`,
  GET_CATEGORY_RECIPES: `${API_URL}/recipes/getPublishedRecipesByCategory/`,
  CREATE_CATEGORIE: `${API_URL}/categories/createCategory`,
  DELETE_CATEGORIE: `${API_URL}/categories/deleteCategory`,
  UPDATE_CATEGORIE: `${API_URL}/categories/updateCategory`,
  GET_ROLE: `${API_URL}/roles/getRole/`,
  GET_ROLES: `${API_URL}/roles/get`,
  CREATE_ROLE: `${API_URL}/roles/create`,
  DELETE_ROLE: `${API_URL}/roles/delete`,
  UPDATE_ROLE: `${API_URL}/roles/update`,
  ASSIGN_ROLE: `${API_URL}/roles/assign`,
  BAN_USER: `${API_URL}/banned-users/ban`,
  UNBAN_USER: `${API_URL}/banned-users/unban`,
} as const;
