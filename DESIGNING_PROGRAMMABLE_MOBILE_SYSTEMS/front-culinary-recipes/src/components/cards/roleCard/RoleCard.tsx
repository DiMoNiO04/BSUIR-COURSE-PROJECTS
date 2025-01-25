import React from 'react';
import styles from './RoleCard.module.scss';
import { IRole } from '@/api';
import { Link } from 'react-router-dom';
import { EButtonType, EUrls } from '@/utils';
import { EditIcon } from '@/components/icons';

const RoleCard: React.FC<IRole> = ({ value, description }) => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.info}>
          <h3 className={styles.title}>{value}</h3>
          <p className={styles.desc}>{description}</p>
        </div>
        <div className={styles.btns}>
          <Link to={`${EUrls.UPDATE_ROLE}/${value.toLowerCase()}`} type={EButtonType.BUTTON} className={styles.btn}>
            <EditIcon />
          </Link>
        </div>
      </div>
    </>
  );
};

export default RoleCard;
