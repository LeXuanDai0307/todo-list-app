'use client';
import { useState } from 'react';
import styles from './style.module.css';

export interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  value?: SelectOption;
  name: string;
  options: SelectOption[];
  label: string;
  onChange: (name: any, value: any) => void;
}

export function Select(props: SelectProps) {
  const { name, options, label, value, onChange } = props;

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.name, event.target.value);
  };

  return (
    <div className={styles.selectContainer}>
      <label htmlFor={label}>{label}</label>
      <select
        name={name}
        className={styles.select}
        id={label}
        value={value?.value}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
