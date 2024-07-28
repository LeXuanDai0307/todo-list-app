import { TaskColumns } from '@/app/page';
import { SortState } from '@/hooks/use-sort-tasks';
import { getTasks } from '@/services';
import { TaskEntity } from '@/types';
import { Order, Status } from '@/utils';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface useFetchTaskParams {
  sortTasks: (tasks: TaskEntity[], order: Order) => TaskEntity[];
  sortState: SortState;
  setTaskColumns: Dispatch<SetStateAction<TaskColumns | undefined>>;
}

export function useFetchTask(params: useFetchTaskParams) {
  const { sortTasks, sortState, setTaskColumns } = params;
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);

  const filterTasks = useCallback(
    (tasks: TaskEntity[], sortState: SortState) => {
      let todoTasks = tasks.filter(
        (task: TaskEntity) => task.status == Status.TODO,
      );
      todoTasks = sortTasks(todoTasks, sortState[Status.TODO]);
      let doneTasks = tasks.filter(
        (task: TaskEntity) => task.status == Status.DONE,
      );
      doneTasks = sortTasks(doneTasks, sortState[Status.DONE]);

      return { todoTasks, doneTasks };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const tasks = await getTasks();
      const { todoTasks, doneTasks } = filterTasks(tasks, sortState);
      setTaskColumns({
        [Status.TODO]: todoTasks,
        [Status.DONE]: doneTasks,
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    if (refetch) {
      fetchTasks();
      setRefetch(false);
    }
  }, [fetchTasks, refetch]);

  return { filterTasks, loading, setRefetch };
}
