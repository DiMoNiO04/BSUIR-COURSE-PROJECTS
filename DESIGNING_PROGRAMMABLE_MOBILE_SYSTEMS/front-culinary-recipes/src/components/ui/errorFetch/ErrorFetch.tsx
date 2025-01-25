import React from 'react';
import styles from './ErrorFetch.module.scss';

interface IErrorFetch {
  message?: string | null;
}

const ErrorFetch: React.FC<IErrorFetch> = ({ message }) => {
  return <div className={styles.text}>{message || 'Error loading. Please try again later.'}</div>;
};

export default ErrorFetch;
