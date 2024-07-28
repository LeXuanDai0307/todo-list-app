'use client';
import { AddTaskModal, TaskCard, TodoColumn } from '@/features';
import {
  faClipboard,
  faSquareCheck,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './page.module.css';
import { createContext, useState } from 'react';
import { TaskEntity } from '@/types';
import { Status } from '@/utils';
import useSortTasks from '@/hooks/use-sort-tasks';
import { SortTasksButton } from '@/features/sort-tasks-button';
import { useDragDropTask, useFetchTask } from '@/hooks';
import clsx from 'clsx';
import { Loading } from '@/components';

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

  const { sortState, handleSort, sortTasks } = useSortTasks({
    taskColumns,
    setTaskColumns,
  });

  const {
    loading: fetchLoading,
    filterTasks,
    setRefetch,
  } = useFetchTask({
    sortTasks,
    sortState,
    setTaskColumns,
  });

  const {
    dropIndicator,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleDragOver,
    moveLoading,
  } = useDragDropTask({
    taskColumns,
    setTaskColumns,
    sortState,
    filterTasks,
  });

  const todoTasks = taskColumns?.[Status.TODO] || [];
  const doneTasks = taskColumns?.[Status.DONE] || [];

  const taskListWrapperStyles = (
    dropIndicator: string,
    id: 'todo' | 'done',
  ) => {
    return clsx({
      [styles.taskListWrapper]: true,
      [styles.dropIndicator]: dropIndicator === id,
    });
  };

  return (
    <TodoContext.Provider value={{ setRefetch }}>
      <main>
        {(fetchLoading || moveLoading) && <Loading />}
        <div className={styles.container}>
          {/* Render TO-DO tasks columns */}
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
              id='todo'
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, Status.TODO)}
              className={taskListWrapperStyles(dropIndicator ?? '', 'todo')}
            >
              <AddTaskModal />
              {todoTasks.map((task) => (
                <div
                  key={`todo-${task.id}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  onDragEnd={handleDragEnd}
                >
                  <TaskCard task={task} />
                </div>
              ))}
            </div>
          </TodoColumn>

          {/* Render DONE tasks columns */}
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
            <div
              id='done'
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, Status.DONE)}
              className={taskListWrapperStyles(dropIndicator ?? '', 'done')}
            >
              {doneTasks.map((task) => (
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
          </TodoColumn>
        </div>
      </main>
    </TodoContext.Provider>
  );
}
