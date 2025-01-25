import React from 'react';
import { Link } from 'react-router-dom';
import { IRecipe } from '@/api';
import { EUrls } from '@/utils';
import styles from './SearchPanelCard.module.scss';

const SearchPanelCard: React.FC<IRecipe> = ({ id, title, image, category }) => {
  return (
    <Link to={`${EUrls.RECIPE}/${id}/`} className={`${styles.card}`}>
      <div className={styles.img}>
        <img src={image} alt="" width={65} height={65} />
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{title}</p>
        <p className={styles.category}>{category?.name}</p>
      </div>
    </Link>
  );
};

export default SearchPanelCard;
