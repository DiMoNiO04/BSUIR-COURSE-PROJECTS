import React from 'react';
import { team } from '@/data';
import { TeamCard } from '@/components/cards';
import styles from './TalentTeam.module.scss';

const TalentTeam: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>An incredible team of talented chefs and foodies</h2>
        <div className={styles.cards}>
          {team.map((card) => (
            <TeamCard {...card} key={card.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TalentTeam;
