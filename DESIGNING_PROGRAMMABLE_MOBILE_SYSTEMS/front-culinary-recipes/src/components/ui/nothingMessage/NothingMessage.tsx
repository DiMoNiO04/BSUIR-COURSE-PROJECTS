import React from 'react';
import styles from './NothingMessage.module.scss';

interface INothingMessage {
  text: string;
}

const NothingMessage: React.FC<INothingMessage> = ({ text }) => {
  return <div className={styles.text}>{text}</div>;
};

export default NothingMessage;
