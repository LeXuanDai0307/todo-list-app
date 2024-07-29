import styles from './style.module.css';

export interface SwitchProps {
  label?: string;
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
}

export function Switch(props: SwitchProps) {
  const { label, isChecked, setIsChecked } = props;

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.switchContainer}>
      {label && <label>{label}</label>}
      <div className={styles.wrapper}>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleChange}
          className={styles.input}
        />
        <div
          className={`${styles.circle} ${isChecked ? styles.checked : ''}`}
        />
      </div>
    </div>
  );
}
