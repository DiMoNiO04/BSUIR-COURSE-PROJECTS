export interface IAuthResponse {
  token: string;
  message: string;
  role: string;
}

export interface IErrorResponse {
  message: string;
}

export interface IAuthCallbacks {
  onSuccess?: () => void;
}

export interface IApiResponseReturn<T> {
  code?: number | null;
  message: string | null;
  data: T | null;
  isLoading: boolean;
  isError: boolean;
}

export interface IApiResponse<T> {
  code: number;
  message: string;
  time: string;
  data: T;
}

interface IUserRoles {
  id: number;
  roleId: number;
  userId: number;
}

export interface IRole {
  id: number;
  value: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  UserRoles: IUserRoles;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bannedId: boolean;
  createdAt: string;
  updatedAt: string;
  roles: IRole[];
  recipes: IRecipe[];
  bannedUser: IBanUser;
}

export interface IBanUser {
  email: string;
  reason: string;
}

export interface ICategory {
  length: number;
  id: number;
  name: string;
  description: string;
  image: string;
  countrecipes: number;
}

export interface IRecipe {
  id: number;
  title: string;
  shortDescription: string;
  ingredients: string;
  instructions: string;
  cookingTime: number;
  calories: number;
  image: string;
  isPublished?: boolean;
  createdAt: string;
  author?: IAuthorRecipe;
  category?: ICategory;
}

export interface IAuthorRecipe {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export const OPTIONS = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 120000,
  dedupingInterval: 1000,
};
