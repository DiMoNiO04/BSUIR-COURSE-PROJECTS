/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from './Textarea.module.scss';

interface ITextareaProps {
  placeholder?: string;
  isReadonly?: boolean;
  isRequired?: boolean;
  register: any;
  name: string;
  errors?: any;
  isLabelSemicolon?: boolean;
}

const Textarea: React.FC<ITextareaProps> = ({
  placeholder,
  register,
  name,
  errors,
  isReadonly = false,
  isRequired = false,
  isLabelSemicolon = false,
}) => {
  const hasError = Boolean(errors[name]);

  return (
    <div className={`${styles.textareaContainer} ${hasError && styles.errorTextarea}`}>
      <textarea
        placeholder={isRequired ? `${placeholder}*` : placeholder}
        readOnly={isReadonly}
        required={isRequired}
        rows={10}
        {...register(name)}
        className={styles.textarea}
      />
      {isLabelSemicolon && <span className={styles.notice}>For a separating point, use the symbol ;</span>}
      {hasError && <span className={styles.error}>{errors[name].message}</span>}
    </div>
  );
};

export default Textarea;
