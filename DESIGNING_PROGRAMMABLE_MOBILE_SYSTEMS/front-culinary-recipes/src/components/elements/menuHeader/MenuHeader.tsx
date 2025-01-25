import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MenuHeader.module.scss';
import { EUrls } from '@/utils';

const MenuHeader: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <Link to={EUrls.ABOUT}>About us</Link>
        </li>
        <li className={styles.menuItem}>
          <Link to={EUrls.CATEGORIES}>Categories</Link>
        </li>
        <li className={styles.menuItem}>
          <Link to={EUrls.RECIPES}>Recipes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MenuHeader;
