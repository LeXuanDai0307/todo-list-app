'use client';
import { AddTaskModal, TaskCard, TodoColumn } from '@/features';
import {
  faClipboard,
  faSquareCheck,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { TaskEntity } from '@/types';
import { getTasks } from '@/services';
import { Status } from '@/utils';

export default function Home() {
  const [tasks, setTasks] = useState<{
    todo: TaskEntity[];
    done: TaskEntity[];
  }>();

  useEffect(() => {
    try {
      (async () => {
        const task = await getTasks();
        const todo = task.filter(
          (task: TaskEntity) => task.status == Status.TODO,
        );
        const done = task.filter(
          (task: TaskEntity) => task.status == Status.DONE,
        );
        setTasks({
          todo,
          done,
        });
      })();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <main>
      <div className={styles.container}>
        <TodoColumn
          title='To-Do'
          icon={<FontAwesomeIcon icon={faClipboard} size='2xl' />}
          action={<AddTaskModal />}
        >
          <div className={styles.taskListWrapper}>
            {tasks?.todo.map((task) => <TaskCard key={task.id} task={task} />)}
          </div>
        </TodoColumn>
        <TodoColumn
          title='Done'
          icon={<FontAwesomeIcon icon={faSquareCheck} size='2xl' />}
        >
          <div className={styles.taskListWrapper}>
            {tasks?.done.map((task) => <TaskCard key={task.id} task={task} />)}
          </div>
        </TodoColumn>
      </div>
    </main>
  );
}
