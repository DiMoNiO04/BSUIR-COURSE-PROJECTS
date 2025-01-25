import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ModeratorCategories from '../moderatorCategories/ModeratorCategories';
import ModeratorRecipes from '../moderatorRecipes/ModeratorRecipes';
import { AdminModerMain } from '@/components/layouts';
import { EUrls } from '@/utils';

const ModeratorPanel: React.FC = () => {
  const tabButtons = [
    { label: 'Categories', value: 'categories/' },
    { label: 'Recipes', value: 'recipes/' },
  ];

  const tabContents = {
    categories: <ModeratorCategories />,
    recipes: <ModeratorRecipes />,
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AdminModerMain title="Moderator Panel" role="MODERATOR" tabContents={tabContents} tabButtons={tabButtons} />
        }
      >
        <Route path={EUrls.MODERATOR_CATEGORIES} element={<ModeratorCategories />} />
        <Route path={EUrls.MODERATOR_RECIPES} element={<ModeratorRecipes />} />
      </Route>
    </Routes>
  );
};

export default ModeratorPanel;
