import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Socials } from '@/components/ui';
import { LogoIcon } from '@/components/icons';
import styles from './Footer.module.scss';
import { EUrls } from '@/utils';

const menuBlocksData = [
  {
    title: 'Tastebite',
    links: [
      { text: 'About us', href: EUrls.ABOUT },
      { text: 'Categories', href: EUrls.CATEGORIES },
      { text: 'Recipes', href: EUrls.RECIPES },
    ],
  },
  {
    title: 'Follow',
    links: [
      { text: 'Facebook', href: '#' },
      { text: 'Twitter', href: '#' },
      { text: 'Instagram', href: '#' },
      { text: 'Youtube', href: '#' },
    ],
  },
];

const Footer: React.FC = () => {
  const [openBlocks, setOpenBlocks] = useState<Record<string, boolean>>(
    Object.fromEntries(menuBlocksData.map((block) => [block.title, false]))
  );

  const toggleBlock = (title: string) => {
    setOpenBlocks((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <LogoIcon className={styles.logo} />
            <p className={styles.topText}>
              On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and
              demoralized by the charms of pleasure of the moment.
            </p>
          </div>
          <ul className={styles.menu}>
            {menuBlocksData.map(({ title, links }) => (
              <li key={title} className={`${styles.menuBlock} ${openBlocks[title] ? styles.open : ''}`}>
                <div className={styles.menuBlockTitle} onClick={() => toggleBlock(title)}>
                  {title}
                </div>
                <ul className={styles.menuBlockList}>
                  {links.map(({ text, href }) => (
                    <li key={text}>
                      <Link to={href}>{text}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.bottom}>
          <p className={styles.year}>© 2024 Tastebite - All rights reserved</p>
          <Socials color={'#7F7F7F'} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
