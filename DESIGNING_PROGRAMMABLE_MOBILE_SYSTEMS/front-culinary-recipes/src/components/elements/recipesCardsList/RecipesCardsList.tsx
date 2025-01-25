import React from 'react';
import { RecipeCard } from '@/components/cards';
import { NothingMessage, Loading, ErrorFetch } from '@/components/ui';
import { IRecipe } from '@/api';
import styles from './RecipesCardsList.module.scss';

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
    <div className={styles.cards}>
      {cards.map((card) => (
        <RecipeCard {...card} key={card.id} />
      ))}
    </div>
  );
};

export default RecipesCardsList;
