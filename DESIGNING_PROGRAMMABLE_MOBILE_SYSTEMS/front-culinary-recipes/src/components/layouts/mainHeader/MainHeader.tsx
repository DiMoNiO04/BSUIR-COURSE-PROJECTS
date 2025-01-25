import React from 'react';
import { Socials } from '@/components/ui';
import { LogoIcon } from '@/components/icons';
import { MenuHeader, UserProfile, BurgerBtn, SearchToggle } from '@/components/elements';
import { useHeader } from '@/hooks';
import styles from './MainHeader.module.scss';

const MainHeader: React.FC = () => {
  const { isScrolled, isOpenBurger, handleBurgerToggle } = useHeader();

  return (
    <header className={`${styles.header} ${isOpenBurger && styles.open} ${isScrolled && styles.scroll}`}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className="container">
            <div className={styles.topContainer}>
              <div className={styles.topLogo}>
                <LogoIcon />
              </div>
              <div className={styles.socials}>
                <Socials />
              </div>
              <div className={styles.topRight}>
                <SearchToggle />
                <UserProfile />
                <BurgerBtn isOpen={isOpenBurger} onClick={handleBurgerToggle} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={`container ${styles.bottomCont}`}>
            <div className={styles.bottomContainer}>
              <div className={styles.bottomLogo}>
                <LogoIcon />
              </div>
              <MenuHeader />
              <div className={styles.bottomSocials}>
                <Socials />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
