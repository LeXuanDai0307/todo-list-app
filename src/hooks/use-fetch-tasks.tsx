import { TaskColumns } from '@/app/page';
import { SortState } from '@/hooks/use-sort-tasks';
import { getTasks } from '@/services';
import { filterTasks, Status } from '@/utils';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface useFetchTaskParams {
  sortState: SortState;
  setTaskColumns: Dispatch<SetStateAction<TaskColumns | undefined>>;
}

export function useFetchTask(params: useFetchTaskParams) {
  const { sortState, setTaskColumns } = params;
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);

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

  return { loading, setRefetch };
}
