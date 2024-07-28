import clsx from 'clsx';
import styles from './style.module.css';
import { Priority, PRIORITY_CLASS } from '@/utils';

export interface LevelItemProps {
  priority?: Priority;
}

export function LevelItem(props: LevelItemProps) {
  const { priority = Priority.DEFAULT } = props;

  const levelItemStyles = clsx({
    [styles.base]: true,
    [styles[PRIORITY_CLASS[priority]]]: true,
  });

  return <div className={levelItemStyles}></div>;
}
