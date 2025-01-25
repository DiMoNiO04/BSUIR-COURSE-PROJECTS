import React from 'react';
import styles from './CreateUpdatePageLayout.module.scss';

interface ICreateUpdatePageLayout {
  title: string;
  children: React.ReactNode;
}

const CreateUpdatePageLayout: React.FC<ICreateUpdatePageLayout> = ({ title, children }) => {
  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.title}>{title}</h1>
        {children}
      </div>
    </section>
  );
};

export default CreateUpdatePageLayout;
