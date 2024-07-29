'use client';
import {
  AddTaskModal,
  SortTasksButton,
  TaskCard,
  TodoColumn,
} from '../../features';
import {
  faClipboard,
  faSquareCheck,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './page.module.css';
import { useState } from 'react';
import { TaskEntity } from '@/types';
import { Status } from '../../utils';
import { useDragDropTask, useFetchTask, useSortTasks } from '../../hooks';
import clsx from 'clsx';
import { Loading } from '../../components';
import { TodoContext } from '../../context';

export type TaskColumns = {
  [Status.TODO]: TaskEntity[];
  [Status.DONE]: TaskEntity[];
};

export default function Home() {
  const [taskColumns, setTaskColumns] = useState<TaskColumns>();

  const { sortState, handleSort } = useSortTasks({
    taskColumns,
    setTaskColumns,
  });

  const { loading: fetchLoading, setRefetch } = useFetchTask({
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
