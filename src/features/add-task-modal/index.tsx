'use client';
import { Button, Modal, Select, Switch, TextField } from '@/components';
import { useState } from 'react';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TaskForm } from '@/features/task-form';
import { CreateTaskInput, TaskEntity } from '@/types';
import { DueDate, Effort, Priority, Status } from '@/utils';
import { createTask } from '@/services';

interface AddTaskModalProps {}

export function AddTaskModal(props: AddTaskModalProps) {
  const [open, setOpen] = useState(false);
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
      createTask(payload);
      handleClose();
      alert('Task created successfully');
    } catch (error) {
      console.error('Error creating task: ', error);
    }
  };

  return (
    <div>
      <Button color='primary' onClick={handleOpen}>
        <FontAwesomeIcon icon={faPlus} />
        <span>Add Task</span>
      </Button>
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
