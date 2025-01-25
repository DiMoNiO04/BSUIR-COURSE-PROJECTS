import React from 'react';
import styles from './ScrollBtn.module.scss';

const ScrollBtn: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.btn} onClick={scrollToTop}>
      <img src="/icons/arrowDown.svg" alt="up" width={24} height={24} />
    </div>
  );
};

export default ScrollBtn;
