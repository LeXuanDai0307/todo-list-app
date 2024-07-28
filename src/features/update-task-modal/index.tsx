'use client';
import { Modal } from '@/components';
import { TaskForm } from '@/features/task-form';
import { updateTask } from '@/services';
import { TaskEntity } from '@/types';
import { useState } from 'react';

interface UpdateTaskModalProps {
  onClose?: () => void;
  task: TaskEntity;
}

export function UpdateTaskModal(props: UpdateTaskModalProps) {
  const { onClose, task } = props;
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState<TaskEntity>(task);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const onSubmit = async () => {
    try {
      await updateTask(formValues.id, formValues);
      handleClose();
      alert('Task updated successfully');
    } catch (error) {
      console.error('Error updating task: ', error);
    }
  };

  return (
    <div>
      <li onClick={handleOpen}>Update</li>
      <Modal title='Update Task' open={open} onClose={handleClose}>
        <TaskForm
          onSubmit={onSubmit}
          formValues={formValues}
          setFormValues={setFormValues}
          type='Update'
          handleClose={handleClose}
        />
      </Modal>
    </div>
  );
}
