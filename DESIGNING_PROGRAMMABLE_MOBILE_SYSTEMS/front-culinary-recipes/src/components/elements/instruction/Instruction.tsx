import React from 'react';
import { splitBySemicolon } from '@/utils/functions';
import styles from './Insruction.module.scss';

interface IInstruction {
  instructions: string;
}

const Insruction: React.FC<IInstruction> = ({ instructions }) => {
  if (!instructions) return null;

  const instructionList = splitBySemicolon(instructions);

  return (
    <div className={styles.block}>
      <h3 className={styles.title}>Instructions</h3>
      <ul className={styles.list}>
        {instructionList.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
    </div>
  );
};

export default Insruction;
