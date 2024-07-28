'use client';
import { Button } from '@/components';
import { createTask, deleteTask, getTasks, updateTask } from '@/services';
import { DueDate, Effort, Priority, Status } from '@/utils';

export interface ILandingPageProps {}

export default function LandingPage(props: ILandingPageProps) {
  const handleGetAll = async () => {
    try {
      const task = await getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await createTask({
        title: 'New Task',
        client: 'New Client',
        effort: Effort.HARD,
        dueDate: DueDate.FRIDAY,
        priority: Priority.HIGH,
        status: Status.TODO,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const res = await updateTask(id, {
        id,
        title: 'Update Task',
        client: 'Update Client',
        effort: Effort.EASY,
        dueDate: DueDate.MONDAY,
        priority: Priority.MEDIUM,
        status: Status.DONE,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteTask(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        margin: '40px auto',
      }}
    >
      <Button onClick={handleGetAll}>Get All</Button>
      <Button onClick={handleCreate}>Create</Button>
      <Button onClick={() => handleUpdate('3')}>Update</Button>
      <Button onClick={() => handleDelete('2')}>Delete</Button>
    </div>
  );
}
