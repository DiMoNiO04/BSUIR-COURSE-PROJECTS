import React from 'react';
import { Socials } from '@/components/ui';
import styles from './Operating.module.scss';

const Operating: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.container}>
          <h2 className={styles.title}>Operatring from NYC, Dubai and London</h2>
          <p className={styles.description}>
            Gastronomy atmosphere set aside. Slice butternut cooking home. Delicious romantic undisturbed raw platter
            will meld. Thick Skewers skillet natural, smoker soy sauce wait roux. slices rosette bone-in simmer
            precision alongside baby leeks. Crafting renders aromatic enjoyment.
          </p>
          <div className={styles.socials}>
            <Socials />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Operating;
