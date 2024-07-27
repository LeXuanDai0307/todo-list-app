import clsx from 'clsx';
import styles from './style.module.css';
import { Priority } from '@/utils';

export interface LevelItemProps {
  priority?: Priority;
}

export function LevelItem(props: LevelItemProps) {
  const { priority = Priority.DEFAULT } = props;

  const levelItemStyles = clsx({
    [styles.base]: true,
    [styles[priority]]: priority,
  });

  return <div className={levelItemStyles}></div>;
}
