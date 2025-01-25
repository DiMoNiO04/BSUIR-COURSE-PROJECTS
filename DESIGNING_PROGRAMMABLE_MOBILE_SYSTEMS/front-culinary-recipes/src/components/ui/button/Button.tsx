import React from 'react';
import { Link } from 'react-router-dom';
import { EButtonClass, EButtonSize, EButtonType } from '@/utils';
import styles from './Button.module.scss';

interface IButton {
  text: string;
  nameClass: EButtonClass;
  size: EButtonSize;
  isLink: boolean;
  customClass?: string;
  linkUrl?: string;
  typeBtn?: EButtonType;
  isExternal?: boolean;
  isDisabled?: boolean;
  handle?: () => void;
}

const Button: React.FC<IButton> = ({
  text,
  nameClass,
  size,
  isLink,
  linkUrl,
  customClass,
  typeBtn = EButtonType.BUTTON,
  isExternal = false,
  isDisabled = false,
  handle,
}) => {
  const className = `${styles.btn} ${styles[nameClass]} ${styles[size]} ${customClass}`;

  if (isLink && linkUrl) {
    return (
      <Link to={linkUrl} className={className} target={isExternal ? '_blank' : '_self'}>
        {text}
      </Link>
    );
  }

  return (
    <button type={typeBtn} className={className} disabled={isDisabled} onClick={handle}>
      {text}
    </button>
  );
};

export default Button;
