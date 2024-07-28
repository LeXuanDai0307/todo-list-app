'use client';
import { AddTaskModal, TaskCard, TodoColumn } from '@/features';
import {
  faClipboard,
  faSquareCheck,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './page.module.css';
import { createContext, use, useCallback, useEffect, useState } from 'react';
import { TaskEntity } from '@/types';
import { getTasks, updateTask } from '@/services';
import { Order, Status } from '@/utils';

import useSortTasks from '@/hooks/use-sort-tasks';
import { SortTasksButton } from '@/features/sort-tasks-button';

type TodoContextType = {
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
};
export const TodoContext = createContext<TodoContextType>({
  setRefetch: () => {},
});

export type TaskColumns = {
  [Status.TODO]: TaskEntity[];
  [Status.DONE]: TaskEntity[];
};

export default function Home() {
  const [taskColumns, setTaskColumns] = useState<TaskColumns>();

  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const { sortState, handleSort } = useSortTasks();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    const task = await getTasks();

    const todo = task.filter((task: TaskEntity) => task.status == Status.TODO);
    const sortedTodo = sortTasks([...todo], sortState[Status.TODO]);
    const done = task.filter((task: TaskEntity) => task.status == Status.DONE);
    const sortedDone = sortTasks([...done], sortState[Status.DONE]);

    setTaskColumns({
      [Status.TODO]: sortedTodo,
      [Status.DONE]: sortedDone,
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
    if (taskColumns) {
      const sortedTodo = sortTasks(
        [...taskColumns[Status.TODO]],
        sortState[Status.TODO],
      );
      const sortedDone = sortTasks(
        [...taskColumns[Status.DONE]],
        sortState[Status.DONE],
      );

      setTaskColumns({
        [Status.TODO]: sortedTodo,
        [Status.DONE]: sortedDone,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortState]);

  const [dropIndicator, setDropIndicator] = useState<string | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string,
  ) => {
    console.log('drag start', taskId);
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.clearData();
    setDropIndicator(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: Status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');

    const dropTask = [
      ...taskColumns?.[Status.TODO]!,
      ...taskColumns?.[Status.DONE]!,
    ]?.find((task) => task.id.toString() === taskId);

    if (dropTask) {
      let newTasks = [
        ...taskColumns?.[Status.TODO]!,
        ...taskColumns?.[Status.DONE]!,
      ].filter((task) => task.id !== dropTask.id);
      dropTask.status = status;
      newTasks.push(dropTask);

      const todo = newTasks.filter(
        (task: TaskEntity) => task.status == Status.TODO,
      );
      const sortedTodo = sortTasks([...todo], sortState[Status.TODO]);
      const done = newTasks.filter(
        (task: TaskEntity) => task.status == Status.DONE,
      );
      const sortedDone = sortTasks([...done], sortState[Status.DONE]);

      setTaskColumns({
        [Status.TODO]: sortedTodo,
        [Status.DONE]: sortedDone,
      });
      updateTask(dropTask.id, dropTask);
    }

    setDropIndicator(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropIndicator(e.currentTarget.id);
  };

  return (
    <TodoContext.Provider value={{ setRefetch }}>
      <main>
        <div className={styles.container}>
          <TodoColumn
            title='To-Do'
            icon={<FontAwesomeIcon icon={faClipboard} size='2xl' />}
            action={
              <SortTasksButton
                status={Status.TODO}
                sortState={sortState}
                handleSort={handleSort}
              />
            }
          >
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, Status.TODO)}
              className={styles.taskListWrapper}
            >
              <AddTaskModal />
              {loading ? (
                <div>Loading...</div>
              ) : (
                taskColumns?.[Status.TODO].map((task) => (
                  <div
                    key={`todo-${task.id}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onDragEnd={handleDragEnd}
                  >
                    <TaskCard task={task} />
                  </div>
                ))
              )}
            </div>
          </TodoColumn>
          <TodoColumn
            title='Done'
            icon={<FontAwesomeIcon icon={faSquareCheck} size='2xl' />}
            action={
              <SortTasksButton
                status={Status.DONE}
                sortState={sortState}
                handleSort={handleSort}
              />
            }
          >
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, Status.DONE)}
                className={styles.taskListWrapper}
              >
                {taskColumns?.[Status.DONE].map((task) => (
                  <div
                    key={`done-${task.id}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onDragEnd={handleDragEnd}
                  >
                    <TaskCard task={task} />
                  </div>
                ))}
              </div>
            )}
          </TodoColumn>
        </div>
      </main>
    </TodoContext.Provider>
  );
}
