import { EffortLevel } from '@/components/effort-level';
import styles from './style.module.css';
import { DueDateTag } from '@/components/due-date-tag';
import { TaskOptions } from '@/features/task-options';
import { TaskEntity } from '@/types';

interface TaskCardProps {
  task: TaskEntity;
}

export function TaskCard(props: TaskCardProps) {
  const { task } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.cardHeader}>
        <h6>{task.title}</h6>
        <TaskOptions task={task} />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.dueDateAndPriority}>
          <DueDateTag dueDate={task.dueDate} priority={task.priority} />
          <EffortLevel effort={task.effort} priority={task.priority} />
        </div>
        <p className={styles.client}>{task.client}</p>
      </div>
    </div>
  );
}
