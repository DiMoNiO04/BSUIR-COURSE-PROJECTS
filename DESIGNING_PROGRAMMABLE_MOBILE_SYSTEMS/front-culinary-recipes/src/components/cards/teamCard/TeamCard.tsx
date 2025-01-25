import React from 'react';
import styles from './TeamCard.module.scss';

interface ITeamCard {
  name: string;
  description: string;
  img: string;
}

const TeamCard: React.FC<ITeamCard> = ({ name, description, img }) => {
  return (
    <div className={styles.card}>
      <div className={styles.img}>
        <img src={img} alt={name} width={163} height={163} />
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default TeamCard;
