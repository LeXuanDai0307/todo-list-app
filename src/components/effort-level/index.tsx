import { Effort, Priority } from '@/utils';
import styles from './style.module.css';
import { LevelItem } from '@/components/level-item';

export interface EffortLevelProps {
  effort: Effort;
  priority: Priority;
}

export function EffortLevel(props: EffortLevelProps) {
  const { effort, priority } = props;

  return (
    <div className={styles.wrapper}>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <LevelItem
            key={index}
            priority={index < effort ? priority : Priority.DEFAULT}
          />
        ))}
    </div>
  );
}
