import { EffortLevel } from '@/components/effort-level';
import styles from './style.module.css';
import { Effort, Priority } from '@/utils';
import { DueDateTag } from '@/components/due-date-tag';
import { TaskOptions } from '@/components/task-options';

interface TaskCardProps {}

export function TaskCard(props: TaskCardProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cardHeader}>
        <h6>My task</h6>
        <TaskOptions />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.dueDateAndPriority}>
          <DueDateTag dueDate='Mon' priority={Priority.HIGH} />
          <EffortLevel effort={Effort.HARD} priority={Priority.HIGH} />
        </div>
        <p className={styles.client}>Project or Client</p>
      </div>
    </div>
  );
}
