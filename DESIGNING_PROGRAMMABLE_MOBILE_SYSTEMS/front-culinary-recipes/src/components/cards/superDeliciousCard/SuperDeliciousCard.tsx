import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@/components/elements';
import { IRecipe } from '@/api';
import { EUrls } from '@/utils';
import { formatDate } from '@/utils/functions';
import styles from './SuperDeliciousCard.module.scss';

const SuperDeliciousCard: React.FC<IRecipe> = ({ id, title, author, createdAt, image }) => {
  return (
    <Link to={`${EUrls.RECIPE}/${id}/`} className={styles.card}>
      <div className={styles.img}>
        <img src={image} alt={title} width={348} height={265} />
      </div>
      <div className={styles.info}>
        <div className={styles.content}>
          <Rating />
          <div className={styles.name}>{title}</div>
          {author && (
            <div className={styles.author}>
              <div className={styles.authorIcon}>
                <img src="/icons/profile.svg" alt="" width={32} height={32} />
              </div>
              <div className={styles.authorName}>
                {author?.firstName} {author?.lastName}
              </div>
            </div>
          )}
        </div>
        <div className={styles.block}>
          <div className={styles.blockItem}>
            <img src="/icons/calendar.svg" alt="Calendar Icon" width={16} height={18} />
            {formatDate(createdAt)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SuperDeliciousCard;
