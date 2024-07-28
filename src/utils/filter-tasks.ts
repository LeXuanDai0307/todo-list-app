import { SortState } from '@/hooks';
import { TaskEntity } from '@/types';
import { sortTasks, Status } from '@/utils';

export const filterTasks = (tasks: TaskEntity[], sortState: SortState) => {
  let todoTasks = tasks.filter(
    (task: TaskEntity) => task.status == Status.TODO,
  );
  todoTasks = sortTasks(todoTasks, sortState[Status.TODO]);
  let doneTasks = tasks.filter(
    (task: TaskEntity) => task.status == Status.DONE,
  );
  doneTasks = sortTasks(doneTasks, sortState[Status.DONE]);

  return { todoTasks, doneTasks };
};
