import React, { useState, useEffect } from 'react';
import styles from './Select.module.scss';

export interface IOption {
  id: number;
  name: string;
}

interface ISelect {
  label?: string;
  name?: string;
  value: string | number | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options?: IOption[] | null;
}

const Select: React.FC<ISelect> = ({ label, name, value, onChange, options }) => {
  const [sortedOptions, setSortedOptions] = useState<IOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IOption | null>(
    options ? options.find((option) => option.id === value) || null : null
  );

  useEffect(() => {
    if (options) {
      const initialSelectedOption = options.find((option) => option.id === value) || null;
      setSelectedOption(initialSelectedOption);
    }
  }, [value, options]);

  useEffect(() => {
    if (options) {
      const sorted = [...options].sort((a, b) => a.name.localeCompare(b.name));
      setSortedOptions(sorted);
    }
  }, [options]);

  const handleToggle = () => {
    if (options) setIsOpen(!isOpen);
  };

  const handleOptionChange = (option: IOption) => {
    setSelectedOption(option);
    setIsOpen(false);

    if (onChange) {
      const event = {
        target: {
          name: name,
          value: option.id,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ''}`} onClick={handleToggle}>
        <div className={styles.optionBlock}>
          <span className={`${styles.optionText} ${selectedOption ? '' : styles.placeholder} truncate`}>
            {selectedOption ? selectedOption.name : name}
          </span>
        </div>
        {options && (
          <div className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect opacity="0.01" width="24" height="24" fill="#D8D8D8" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.70711 8.29289C6.31658 7.90237 5.68342 7.90237 5.29289 8.29289C4.90237 8.68342 4.90237 9.31658 5.29289 9.70711L11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L18.7071 9.70711C19.0976 9.31658 19.0976 8.68342 18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289L12 13.5858L6.70711 8.29289Z"
                fill="black"
              />
            </svg>
          </div>
        )}
      </div>
      {isOpen && (
        <div className={styles.optionsContainer}>
          <div className={styles.optionCont}>
            {sortedOptions.map((option) => (
              <div className={styles.option} key={option.id} onClick={() => handleOptionChange(option)}>
                <input
                  id={`option-${option.id}`}
                  type={'radio'}
                  name={name}
                  value={option.id}
                  checked={selectedOption?.id === option.id}
                  onChange={() => handleOptionChange(option)}
                  className="hidden"
                />
                <label
                  htmlFor={`option-${option.id}`}
                  className={`${styles.optionLabel} ${
                    selectedOption?.id === option.id ? styles.optionLabelSelected : styles.optionLabelUnselected
                  }`}
                >
                  {option.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
