'use client';
import { Modal } from '@/components';
import { TaskForm } from '@/features/task-form';
import { useState } from 'react';

interface UpdateTaskModalProps {
  onClose?: () => void;
}

export function UpdateTaskModal(props: UpdateTaskModalProps) {
  const { onClose } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div>
      <li onClick={handleOpen}>Update</li>
      <Modal title='Update Task' open={open} onClose={handleClose}>
        <TaskForm type='Update' handleClose={handleClose} />
      </Modal>
    </div>
  );
}
