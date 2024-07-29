import { TaskColumns } from '@/app/home/page';
import { SortState } from '@/hooks/use-sort-tasks';
import { updateTask } from '@/services';
import { filterTasks, Status } from '@/utils';
import { Dispatch, SetStateAction, useState } from 'react';

interface useDragDropTaskParams {
  taskColumns: TaskColumns | undefined;
  setTaskColumns: Dispatch<SetStateAction<TaskColumns | undefined>>;
  sortState: SortState;
}

export function useDragDropTask(params: useDragDropTaskParams) {
  const { taskColumns, setTaskColumns, sortState } = params;
  const [dropIndicator, setDropIndicator] = useState<string | null>(null);
  const [moveLoading, setMoveLoading] = useState(false);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string,
  ) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.clearData();
    setDropIndicator(null);
  };

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    status: Status,
  ) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    let allTasks = [
      ...taskColumns?.[Status.TODO]!,
      ...taskColumns?.[Status.DONE]!,
    ];

    const dropTask = allTasks.find((task) => task.id.toString() === taskId);

    if (dropTask && dropTask.status !== status) {
      try {
        setMoveLoading(true);
        allTasks = allTasks.filter((task) => task.id !== dropTask.id);
        dropTask.status = status;
        await updateTask(dropTask.id, dropTask);
        allTasks.push(dropTask);
        const { todoTasks, doneTasks } = filterTasks(allTasks, sortState);
        setTaskColumns({
          [Status.TODO]: todoTasks,
          [Status.DONE]: doneTasks,
        });
        setMoveLoading(false);
      } catch (error) {
        alert('Failed to move task');
      }
    }
    setDropIndicator(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropIndicator(e.currentTarget.id);
  };
  return {
    dropIndicator,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleDragOver,
    moveLoading,
  };
}
