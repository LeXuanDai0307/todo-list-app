'use client';
import { AddTaskModal, TaskCard, TodoColumn } from '@/features';
import {
  faClipboard,
  faSquareCheck,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './page.module.css';
import { createContext, useCallback, useEffect, useState } from 'react';
import { TaskEntity } from '@/types';
import { getTasks } from '@/services';
import { Order, Status } from '@/utils';
import { Button } from '@/components';
import {
  faArrowUpShortWide,
  faArrowDownWideShort,
} from '@fortawesome/free-solid-svg-icons';

type TodoContextType = {
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
};
export const TodoContext = createContext<TodoContextType>({
  setRefetch: () => {},
});

export default function Home() {
  const [tasks, setTasks] = useState<{
    todo: TaskEntity[];
    done: TaskEntity[];
  }>();
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortState, setSortState] = useState<{
    todo: Order;
    done: Order;
  }>({
    todo: Order.DESC,
    done: Order.DESC,
  });

  const handleSort = (column: 'todo' | 'done') => {
    setSortState((prevState) => {
      return {
        ...prevState,
        [column]: prevState[column] === Order.ASC ? Order.DESC : Order.ASC,
      };
    });
  };

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    const task = await getTasks();
    const todo = task.filter((task: TaskEntity) => task.status == Status.TODO);
    const sortedTodo = sortTasks([...todo], sortState.todo);
    const done = task.filter((task: TaskEntity) => task.status == Status.DONE);
    const sortedDone = sortTasks([...done], sortState.done);
    setTasks({
      todo: sortedTodo,
      done: sortedDone,
    });
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      (async () => {
        await fetchTasks();
      })();
    } catch (error) {
      console.error(error);
    }
  }, [fetchTasks]);

  useEffect(() => {
    try {
      (async () => {
        if (refetch) {
          await fetchTasks();
          setRefetch(false);
        }
      })();
    } catch (error) {
      console.error(error);
    }
  }, [fetchTasks, refetch]);

  const sortTasks = (tasks: TaskEntity[], order: Order) => {
    return tasks.sort((a, b) =>
      order === Order.ASC ? a.priority - b.priority : b.priority - a.priority,
    );
  };

  useEffect(() => {
    if (tasks) {
      const sortedTodo = sortTasks([...tasks.todo], sortState.todo);
      const sortedDone = sortTasks([...tasks.done], sortState.done);

      setTasks({
        todo: sortedTodo,
        done: sortedDone,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortState]);

  return (
    <TodoContext.Provider value={{ setRefetch }}>
      <main>
        <div className={styles.container}>
          <TodoColumn
            title='To-Do'
            icon={<FontAwesomeIcon icon={faClipboard} size='2xl' />}
            action={
              <Button onClick={() => handleSort('todo')} color='primary'>
                {sortState.todo === Order.ASC ? (
                  <FontAwesomeIcon icon={faArrowDownWideShort} />
                ) : (
                  <FontAwesomeIcon icon={faArrowUpShortWide} />
                )}
                <span>Sort By Priority</span>
              </Button>
            }
          >
            <div className={styles.taskListWrapper}>
              <AddTaskModal />
              {loading ? (
                <div>Loading...</div>
              ) : (
                tasks?.todo.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))
              )}
            </div>
          </TodoColumn>
          <TodoColumn
            title='Done'
            icon={<FontAwesomeIcon icon={faSquareCheck} size='2xl' />}
            action={
              <Button onClick={() => handleSort('done')} color='primary'>
                {sortState.done === Order.ASC ? (
                  <FontAwesomeIcon icon={faArrowDownWideShort} />
                ) : (
                  <FontAwesomeIcon icon={faArrowUpShortWide} />
                )}
                <span>Sort By Priority</span>
              </Button>
            }
          >
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className={styles.taskListWrapper}>
                {tasks?.done.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}
          </TodoColumn>
        </div>
      </main>
    </TodoContext.Provider>
  );
}
