/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { EButtonType, EInputType } from '@/utils';
import styles from './Input.module.scss';

interface IInputProps {
  type: EInputType;
  placeholder?: string;
  icon?: React.ReactNode;
  isReadonly?: boolean;
  isRequired?: boolean;
  register: any;
  name: string;
  errors?: any;
}

const Input: React.FC<IInputProps> = ({
  type,
  placeholder,
  icon,
  register,
  name,
  errors,
  isReadonly = false,
  isRequired = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const hasError = Boolean(errors[name]);

  return (
    <div className={`${styles.input} ${hasError && styles.errorInput}`}>
      <div className={styles.wrapper}>
        <div className={styles.icon}>{icon}</div>
        <input
          type={type === EInputType.PASSWORD && showPassword ? EInputType.TEXT : type}
          placeholder={isRequired ? `${placeholder}*` : placeholder}
          readOnly={isReadonly}
          required={isRequired}
          autoComplete="off"
          {...register(name)}
          className={styles.field}
        />
        {type === EInputType.PASSWORD && (
          <button
            type={EButtonType.BUTTON}
            tabIndex={-1}
            onClick={togglePasswordVisibility}
            className={styles.toggleBtn}
          >
            {showPassword ? (
              <img src="/icons/passwordHide.svg" alt="Hide" width={24} height={24} />
            ) : (
              <img src="/icons/passwordShow.svg" alt="Show" width={24} height={24} />
            )}
          </button>
        )}
      </div>
      {hasError && <span className={styles.error}>{errors[name].message}</span>}
    </div>
  );
};

export default Input;
