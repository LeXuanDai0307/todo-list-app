import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './style.module.css';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { ReactNode } from 'react';

interface TodoColumnProps {
  children?: ReactNode;
  icon: ReactNode;
  title: string;
}

export function TodoColumn(props: TodoColumnProps) {
  const { children, icon, title } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {icon}
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
