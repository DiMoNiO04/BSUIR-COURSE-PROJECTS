import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, TwitterIcon } from '@/components/icons';
import socialLinks from '@/data/socials';
import styles from './Socials.module.scss';

interface ISocials {
  color?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
}

const Socials: React.FC<ISocials> = ({
  facebook = socialLinks.facebook,
  twitter = socialLinks.twitter,
  instagram = socialLinks.instagram,
  color,
}) => {
  const links = [
    { href: facebook, icon: <FacebookIcon color={color} />, key: 'facebook' },
    { href: twitter, icon: <TwitterIcon color={color} />, key: 'twitter' },
    { href: instagram, icon: <InstagramIcon color={color} />, key: 'instagram' },
  ];

  return (
    <div className={styles.icons}>
      {links.map(
        ({ href, icon, key }) =>
          href && (
            <Link to={href} className={styles.icon} key={key} target="_blank">
              {icon}
            </Link>
          )
      )}
    </div>
  );
};

export default Socials;
