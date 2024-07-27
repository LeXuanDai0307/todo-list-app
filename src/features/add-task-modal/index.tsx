'use client';
import { Button, Modal, Select, Switch, TextField } from '@/components';
import { useState } from 'react';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TaskForm } from '@/features/task-form';

interface AddTaskModalProps {}

export function AddTaskModal(props: AddTaskModalProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button color='primary' onClick={handleOpen}>
        <FontAwesomeIcon icon={faPlus} />
        <span>Add Task</span>
      </Button>
      <Modal title='Add New Task' open={open} onClose={handleClose}>
        <TaskForm type='Add' handleClose={handleClose} />
      </Modal>
    </div>
  );
}
