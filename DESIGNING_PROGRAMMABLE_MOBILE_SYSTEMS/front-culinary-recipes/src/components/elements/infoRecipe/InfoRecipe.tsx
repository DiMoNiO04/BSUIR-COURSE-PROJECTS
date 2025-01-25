import React from 'react';
import styles from './InfoRecipe.module.scss';

interface IInfoRecipe {
  cookingTime: number;
  calories: number;
}

const InfoRecipe: React.FC<IInfoRecipe> = ({ cookingTime, calories }) => {
  return (
    <div className={styles.items}>
      <div className={styles.item}>
        <b>PREP TIME</b>
        <span>{cookingTime} MIN</span>
      </div>
      <div className={styles.item}>
        <b>CALORIES</b>
        <span>{calories}</span>
      </div>
    </div>
  );
};

export default InfoRecipe;
