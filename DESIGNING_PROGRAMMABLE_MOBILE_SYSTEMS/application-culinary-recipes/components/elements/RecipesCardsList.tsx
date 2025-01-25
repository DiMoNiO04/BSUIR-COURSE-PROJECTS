import React from 'react';
import { FlatList } from 'react-native';
import { NothingMessage, Loading, ErrorFetch } from '@/components/ui';
import { IRecipe } from '@/api';
import { RecipeCard } from '../cards';

interface IRecipesCardsList {
  cards: IRecipe[] | undefined;
  isLoading?: boolean;
  isError?: boolean;
  msg?: string | null;
}

const RecipesCardsList: React.FC<IRecipesCardsList> = ({ cards, isLoading, isError, msg }) => {
  if (isLoading) return <Loading />;
  if (isError) return <ErrorFetch message={msg} />;

  if (!cards || cards.length === 0) {
    return <NothingMessage text={msg!} />;
  }

  return (
    <FlatList
      data={cards}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={({ item }) => <RecipeCard {...item} />}
      className="gap-4"
    />
  );
};

export default RecipesCardsList;
