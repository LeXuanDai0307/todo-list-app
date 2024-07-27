import { Priority } from '@/utils';
import styles from './style.module.css';
import clsx from 'clsx';

interface DueDateTagProps {
  dueDate: string;
  priority?: Priority;
}

export function DueDateTag(props: DueDateTagProps) {
  const { dueDate, priority = Priority.DEFAULT } = props;

  const levelItemStyles = clsx({
    [styles.base]: true,
    [styles[priority]]: priority,
  });

  return <div className={levelItemStyles}>{dueDate}</div>;
}
