import { ChangeEventHandler } from 'react';
import styles from './style.module.css';

export interface TextFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (name: any, value: any) => void;
  type?: 'text' | 'password';
  error?: string;
}

export function TextField(props: TextFieldProps) {
  const { name, label, value, onChange, type, error } = props;

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.target.name, event.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        name={name}
        type={type}
        placeholder={label}
        onChange={handleInputChange}
        value={value}
        className={styles.input}
      />
    </div>
  );
}
