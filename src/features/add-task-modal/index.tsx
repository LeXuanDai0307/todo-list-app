'use client';
import { Modal } from '@/components';
import { useContext, useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TaskForm } from '@/features/task-form';
import { CreateTaskInput, TaskEntity } from '@/types';
import { DueDate, Effort, Priority, Status } from '@/utils';
import { createTask } from '@/services';
import { TodoContext } from '@/app/page';
import styles from './style.module.css';

interface AddTaskModalProps {}

export function AddTaskModal(props: AddTaskModalProps) {
  const [open, setOpen] = useState(false);

  const { setRefetch } = useContext(TodoContext);
  const [formValues, setFormValues] = useState<TaskEntity>({
    title: '',
    client: '',
    id: '',
    dueDate: DueDate.MONDAY,
    effort: Effort.EASY,
    priority: Priority.LOW,
    status: Status.TODO,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async () => {
    try {
      let payload: CreateTaskInput = {
        title: formValues.title,
        priority: formValues.priority,
        effort: formValues.effort,
        client: formValues.client,
        dueDate: formValues.dueDate,
        status: formValues.status,
      };
      await createTask(payload);
      setRefetch(true);
      handleClose();
    } catch (error) {
      console.error('Error creating task: ', error);
    }
  };

  return (
    <div>
      <button className={styles.addBtn} color='primary' onClick={handleOpen}>
        <FontAwesomeIcon icon={faPlus} />
        <span>Add New Task</span>
      </button>
      <Modal title='Add New Task' open={open} onClose={handleClose}>
        <TaskForm
          onSubmit={onSubmit}
          formValues={formValues}
          setFormValues={setFormValues}
          type='Add'
          handleClose={handleClose}
        />
      </Modal>
    </div>
  );
}
