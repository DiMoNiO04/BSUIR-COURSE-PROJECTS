import React from 'react';
import { StarIcon } from '@/components/icons';
import styles from './Rating.module.scss';

interface IRating {
  rating?: number;
}

const Rating: React.FC<IRating> = ({ rating = 5 }) => {
  return (
    <div className={styles.rating}>
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon key={index} color={index < rating ? '#FF642F' : '#7f7f7f'} />
      ))}
    </div>
  );
};

export default Rating;
