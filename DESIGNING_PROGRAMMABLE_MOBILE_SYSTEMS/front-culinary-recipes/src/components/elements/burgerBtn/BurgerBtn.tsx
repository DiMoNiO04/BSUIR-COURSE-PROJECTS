import React from 'react';
import styles from './BurgerBtn.module.scss';

interface IBurgerBtnProps {
  isOpen: boolean;
  onClick: () => void;
}

const BurgerBtn: React.FC<IBurgerBtnProps> = ({ isOpen, onClick }) => {
  return (
    <div className={`${styles.burger} ${isOpen ? styles.open : ''}`} onClick={onClick}>
      <span className={styles.line}></span>
      <span className={styles.line}></span>
      <span className={styles.line}></span>
    </div>
  );
};

export default BurgerBtn;
