import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Footer, Header } from './components/layouts';
import { ScrollBtn } from './components/elements';
import { EUrls } from './utils';
import { ScrollToTop } from './components';
import { ProtectedAdmin, ProtectedAuth, ProtectedModerator, ProtectedUser } from './components/protecteds';
import MainPage from './app/Main';
import AboutPage from './app/About';
import CategoriesPage from './app/Categories';
import SearchPage from './app/Search';
import FavoritesPage from './app/Favorites';
import CategoryPage from './app/templates/Category';
import RecipePage from './app/templates/Recipe';
import ProfilePage from './app/Profile';
import NotFoundPage from './app/NotFound';
import RecipesPage from './app/Recipes';
import RecipesUserPage from './app/RecipesUser';
import CreateRecipePage from './app/CreateRecipe';
import UpdateRecipePage from './app/UpdateRecipe';
import CreateCategoriePage from './app/CreateCategorie';
import UpdateCategoriePage from './app/UpdateCategorie';
import UpdateRolePage from './app/UpdateRole';
import AdminRolesPage from './app/AdminRoles';
import AdminUsersPage from './app/AdminUsers';
import ModeratorCategoriesPage from './app/ModeratorCategories';
import ModeratorRecipesPage from './app/ModeratorRecipes';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path={EUrls.MAIN} element={<MainPage />} />
        <Route path={EUrls.ABOUT} element={<AboutPage />} />
        <Route path={EUrls.CATEGORIES} element={<CategoriesPage />} />
        <Route path={`${EUrls.CATEGORIES}/:name`} element={<CategoryPage />} />
        <Route path={EUrls.SEARCH} element={<SearchPage />} />
        <Route path={EUrls.RECIPES} element={<RecipesPage />} />
        <Route path={`${EUrls.RECIPE}/:id`} element={<RecipePage />} />

        <Route path={EUrls.PROFILE} element={<ProtectedAuth element={<ProfilePage />} />} />

        <Route path={EUrls.FAVORITES} element={<ProtectedUser element={<FavoritesPage />} />} />
        <Route path={EUrls.PROFILE_RECIPES} element={<ProtectedUser element={<RecipesUserPage />} />} />
        <Route path={EUrls.CREATE_RECIPE} element={<ProtectedUser element={<CreateRecipePage />} />} />
        <Route path={`${EUrls.UPDATE_RECIPE}/:id`} element={<ProtectedUser element={<UpdateRecipePage />} />} />

        <Route path={EUrls.ADMIN_ROLES} element={<ProtectedAdmin element={<AdminRolesPage />} />} />
        <Route path={EUrls.ADMIN_USERS} element={<ProtectedAdmin element={<AdminUsersPage />} />} />
        <Route path={`${EUrls.UPDATE_ROLE}/:value`} element={<ProtectedAdmin element={<UpdateRolePage />} />} />

        <Route
          path={EUrls.MODERATOR_CATEGORIES}
          element={<ProtectedModerator element={<ModeratorCategoriesPage />} />}
        />
        <Route path={EUrls.MODERATOR_RECIPES} element={<ProtectedModerator element={<ModeratorRecipesPage />} />} />
        <Route path={EUrls.CREATE_CATEGORIE} element={<ProtectedModerator element={<CreateCategoriePage />} />} />
        <Route
          path={`${EUrls.UPDATE_CATEGORIE}/:name`}
          element={<ProtectedModerator element={<UpdateCategoriePage />} />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <ScrollBtn />
    </Router>
  );
};

export default App;
