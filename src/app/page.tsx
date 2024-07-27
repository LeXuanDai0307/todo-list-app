import { AddTaskModal, TaskCard, TodoColumn } from '@/features';
import {
  faClipboard,
  faSquareCheck,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <TodoColumn
          title='To-Do'
          icon={<FontAwesomeIcon icon={faClipboard} size='2xl' />}
          action={<AddTaskModal />}
        >
          <div className={styles.taskListWrapper}>
            {Array.from({ length: 5 }).map((_, index) => (
              <TaskCard key={index} />
            ))}
          </div>
        </TodoColumn>
        <TodoColumn
          title='Done'
          icon={<FontAwesomeIcon icon={faSquareCheck} size='2xl' />}
        />
      </div>
    </main>
  );
}
