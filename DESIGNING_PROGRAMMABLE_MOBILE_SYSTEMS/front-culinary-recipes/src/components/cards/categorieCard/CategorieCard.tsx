import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategorieCard.module.scss';
import { EUrls } from '@/utils';

interface ICategorieCard {
  name: string;
  image: string;
}

const CategorieCard: React.FC<ICategorieCard> = ({ name, image }) => {
  return (
    <Link to={`${EUrls.CATEGORIES}/${name.toLowerCase()}/`} className={styles.card}>
      <div className={styles.img}>
        <img src={image} alt={name} width={255} height={255} />
      </div>
      <div className={styles.name}>{name}</div>
    </Link>
  );
};

export default CategorieCard;
