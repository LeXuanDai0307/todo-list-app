import { TaskColumns } from '@/app/page';
import { TaskEntity } from '@/types';
import { Status, Order } from '@/utils';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

export type SortState = {
  [Status.TODO]: Order;
  [Status.DONE]: Order;
};

interface UseSortTasksParams {
  taskColumns: TaskColumns | undefined;
  setTaskColumns: Dispatch<SetStateAction<TaskColumns | undefined>>;
}

export default function useSortTasks(params: UseSortTasksParams) {
  const { taskColumns, setTaskColumns } = params;
  const [sortState, setSortState] = useState<SortState>({
    [Status.TODO]: Order.DESC,
    [Status.DONE]: Order.DESC,
  });

  const handleSort = (status: Status) => {
    setSortState((prevState) => {
      return {
        ...prevState,
        [status]: prevState[status] === Order.ASC ? Order.DESC : Order.ASC,
      };
    });
  };

  const sortTasks = useCallback((tasks: TaskEntity[], order: Order) => {
    return tasks.sort((a, b) =>
      order === Order.ASC ? a.priority - b.priority : b.priority - a.priority,
    );
  }, []);

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
  }, [sortState, sortTasks]);

  return { sortState, handleSort, sortTasks };
}
