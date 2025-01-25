import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TitleSectionLink.module.scss';

interface ITitleLinkSection {
  link?: string;
  linkTxt?: string;
}

const TitleLinkSection: React.FC<ITitleLinkSection> = ({ link, linkTxt }) => {
  if (!link || !linkTxt) return;

  return (
    <Link to={link} className={styles.link}>
      {linkTxt}
    </Link>
  );
};

export default TitleLinkSection;
