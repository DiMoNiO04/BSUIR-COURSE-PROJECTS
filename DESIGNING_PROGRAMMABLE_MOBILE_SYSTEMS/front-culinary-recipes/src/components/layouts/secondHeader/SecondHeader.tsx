import React from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon } from '@/components/icons';
import { BurgerBtn, MenuHeader, SearchToggle, UserProfile } from '@/components/elements';
import { Socials } from '@/components/ui';
import { useHeader } from '@/hooks';
import styles from './SecondHeader.module.scss';

const SecondHeader: React.FC = () => {
  const { isScrolled, isOpenBurger, handleBurgerToggle } = useHeader();

  return (
    <header className={`${styles.header} ${isOpenBurger && styles.open} ${isScrolled && styles.scroll}`}>
      <div className="container">
        <div className={styles.container}>
          <Link to={'/'} className={styles.logo}>
            <LogoIcon />
          </Link>
          <div className={styles.content}>
            <div className={styles.contentContainer}>
              <MenuHeader />
              <div className={styles.socials}>
                <Socials />
              </div>
            </div>
          </div>
          <div className={styles.panel}>
            <SearchToggle />
            <UserProfile />
            <BurgerBtn isOpen={isOpenBurger} onClick={handleBurgerToggle} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default SecondHeader;
