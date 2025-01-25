import React from 'react';
import styles from './Loading.module.scss';

const Loading: React.FC = () => {
  return (
    <div className={styles.block}>
      <img src="/loading.gif" alt="Loading..." className={styles.img} />
    </div>
  );
};

export default Loading;
