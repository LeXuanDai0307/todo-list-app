import { TaskEntity } from '@/types';
import { Order } from '@/utils';

export const sortTasks = (tasks: TaskEntity[], order: Order) => {
  return tasks.sort((a, b) =>
    order === Order.ASC ? a.priority - b.priority : b.priority - a.priority,
  );
};
