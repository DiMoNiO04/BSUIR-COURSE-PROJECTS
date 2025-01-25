import React from 'react';
import styles from './TitleSection.module.scss';
import TitleLinkSection from '../titleSectionLink/TitleSectionLink';

interface ITitleSection {
  title: string;
  link?: string;
  linkTxt?: string;
}

const TitleSection: React.FC<ITitleSection> = ({ title, link, linkTxt }) => {
  return (
    <div className={styles.block}>
      <h2 className={styles.title}>{title}</h2>
      <TitleLinkSection link={link} linkTxt={linkTxt} />
    </div>
  );
};

export default TitleSection;
