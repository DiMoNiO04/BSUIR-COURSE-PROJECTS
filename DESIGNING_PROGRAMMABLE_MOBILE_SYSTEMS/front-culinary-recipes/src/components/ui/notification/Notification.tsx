import React, { useEffect, useState } from 'react';
import styles from './Notification.module.scss';

interface INotification {
  isSuccess: boolean;
  msg: string;
}

const Notification: React.FC<INotification> = ({ isSuccess, msg }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return <div className={`${styles.notification} ${isSuccess ? styles.success : styles.error}`}>{msg}</div>;
};

export default Notification;
