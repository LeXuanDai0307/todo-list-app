import { useState } from 'react';
import styles from './style.module.css';

export interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  label: string;
  onChange: (value: string) => void;
}

export function Select(props: SelectProps) {
  const { options, label, onChange } = props;
  const [selectedValue, setSelectedValue] = useState<string | number>(
    options[0].value,
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className={styles.selectContainer}>
      <label htmlFor={label}>{label}</label>
      <select
        className={styles.select}
        id={label}
        value={selectedValue}
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
