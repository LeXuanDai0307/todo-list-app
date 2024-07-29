import { Priority, PRIORITY_CLASS } from '@/utils';
import styles from './style.module.css';
import clsx from 'clsx';

export interface DueDateTagProps {
  dueDate: string;
  priority?: Priority;
}

export function DueDateTag(props: DueDateTagProps) {
  const { dueDate, priority = Priority.DEFAULT } = props;

  const levelItemStyles = clsx({
    [styles.base]: true,
    [styles[PRIORITY_CLASS[priority]]]: true,
  });

  return <div className={levelItemStyles}>{dueDate}</div>;
}
