import { ChangeEventHandler } from 'react';
import styles from './style.module.css';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: 'text' | 'password';
  error?: string;
}

export function TextField(props: TextFieldProps) {
  const { label, value, onChange, type, error } = props;
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        placeholder={label}
        onChange={onChange}
        value={value}
        className={styles.input}
      />
    </div>
  );
}
