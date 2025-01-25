/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/about`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/login`; params?: Router.UnknownInputParams; } | { pathname: `/signUp`; params?: Router.UnknownInputParams; } | { pathname: `/_404`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/categories`; params?: Router.UnknownInputParams; } | { pathname: `/profile/createRecipe`; params?: Router.UnknownInputParams; } | { pathname: `/profile/editRecipe`; params?: Router.UnknownInputParams; } | { pathname: `/profile/favorites`; params?: Router.UnknownInputParams; } | { pathname: `/profile`; params?: Router.UnknownInputParams; } | { pathname: `/profile/recipes`; params?: Router.UnknownInputParams; } | { pathname: `/recipes`; params?: Router.UnknownInputParams; } | { pathname: `/categories/[category]`, params: Router.UnknownInputParams & { category: string | number; } } | { pathname: `/profile/editRecipe/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `/recipes/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `/search/[query]`, params: Router.UnknownInputParams & { query: string | number; } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/about`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/login`; params?: Router.UnknownOutputParams; } | { pathname: `/signUp`; params?: Router.UnknownOutputParams; } | { pathname: `/_404`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/categories`; params?: Router.UnknownOutputParams; } | { pathname: `/profile/createRecipe`; params?: Router.UnknownOutputParams; } | { pathname: `/profile/editRecipe`; params?: Router.UnknownOutputParams; } | { pathname: `/profile/favorites`; params?: Router.UnknownOutputParams; } | { pathname: `/profile`; params?: Router.UnknownOutputParams; } | { pathname: `/profile/recipes`; params?: Router.UnknownOutputParams; } | { pathname: `/recipes`; params?: Router.UnknownOutputParams; } | { pathname: `/categories/[category]`, params: Router.UnknownOutputParams & { category: string; } } | { pathname: `/profile/editRecipe/[id]`, params: Router.UnknownOutputParams & { id: string; } } | { pathname: `/recipes/[id]`, params: Router.UnknownOutputParams & { id: string; } } | { pathname: `/search/[query]`, params: Router.UnknownOutputParams & { query: string; } };
      href: Router.RelativePathString | Router.ExternalPathString | `/about${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/login${`?${string}` | `#${string}` | ''}` | `/signUp${`?${string}` | `#${string}` | ''}` | `/_404${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/categories${`?${string}` | `#${string}` | ''}` | `/profile/createRecipe${`?${string}` | `#${string}` | ''}` | `/profile/editRecipe${`?${string}` | `#${string}` | ''}` | `/profile/favorites${`?${string}` | `#${string}` | ''}` | `/profile${`?${string}` | `#${string}` | ''}` | `/profile/recipes${`?${string}` | `#${string}` | ''}` | `/recipes${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/about`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/login`; params?: Router.UnknownInputParams; } | { pathname: `/signUp`; params?: Router.UnknownInputParams; } | { pathname: `/_404`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/categories`; params?: Router.UnknownInputParams; } | { pathname: `/profile/createRecipe`; params?: Router.UnknownInputParams; } | { pathname: `/profile/editRecipe`; params?: Router.UnknownInputParams; } | { pathname: `/profile/favorites`; params?: Router.UnknownInputParams; } | { pathname: `/profile`; params?: Router.UnknownInputParams; } | { pathname: `/profile/recipes`; params?: Router.UnknownInputParams; } | { pathname: `/recipes`; params?: Router.UnknownInputParams; } | `/categories/${Router.SingleRoutePart<T>}` | `/profile/editRecipe/${Router.SingleRoutePart<T>}` | `/recipes/${Router.SingleRoutePart<T>}` | `/search/${Router.SingleRoutePart<T>}` | { pathname: `/categories/[category]`, params: Router.UnknownInputParams & { category: string | number; } } | { pathname: `/profile/editRecipe/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `/recipes/[id]`, params: Router.UnknownInputParams & { id: string | number; } } | { pathname: `/search/[query]`, params: Router.UnknownInputParams & { query: string | number; } };
    }
  }
}