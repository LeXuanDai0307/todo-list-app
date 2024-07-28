import { DueDate, Effort, Priority, Status } from '@/utils';

export interface TaskEntity {
  id: string;
  title: string;
  priority: Priority;
  effort: Effort;
  client: string;
  dueDate: DueDate | '';
  status: Status;
}

export interface CreateTaskInput extends Omit<TaskEntity, 'id'> {}

export interface UpdateTaskInput extends TaskEntity {}

export interface DeleteTaskInput extends Pick<TaskEntity, 'id'> {}
