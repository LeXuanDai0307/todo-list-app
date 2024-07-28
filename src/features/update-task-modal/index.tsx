'use client';
import { TodoContext } from '@/app/page';
import { Modal } from '@/components';
import { TaskForm } from '@/features/task-form';
import { updateTask } from '@/services';
import { TaskEntity } from '@/types';
import { useContext, useState } from 'react';

interface UpdateTaskModalProps {
  onClose?: () => void;
  task: TaskEntity;
}

export function UpdateTaskModal(props: UpdateTaskModalProps) {
  const { onClose, task } = props;
  const { setRefetch } = useContext(TodoContext);

  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState<TaskEntity>(task);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormValues(task);
    if (onClose) {
      onClose();
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      await updateTask(formValues.id, formValues);
      setRefetch(true);
      handleClose();
      setLoading(false);
    } catch (error) {
      alert('Error updating task');
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
          loading={loading}
        />
      </Modal>
    </div>
  );
}
