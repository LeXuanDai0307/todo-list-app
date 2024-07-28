'use client';
import { Button, Modal } from '@/components';
import { type } from 'os';
import { useState } from 'react';
import styles from './style.module.css';
import { TaskEntity } from '@/types';
import { deleteTask } from '@/services';

interface DeleteTaskModalProps {
  onClose?: () => void;
  task: TaskEntity;
}

export function DeleteTaskModal(props: DeleteTaskModalProps) {
  const { onClose, task } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleConfirm = async () => {
    try {
      await deleteTask(task.id);
      alert('Task deleted successfully');
      handleClose();
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };

  return (
    <div>
      <li onClick={handleOpen}>Delete</li>
      <Modal title='Confirm Task Deletion' open={open} onClose={handleClose}>
        <p className={styles.confirmText}>
          {`Are you sure you want to delete "${task.title}"  task? This action cannot be
          undone.`}
        </p>
        <div className={styles.formActionsWrapper}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color='primary' onClick={handleConfirm}>
            Delete Task
          </Button>
        </div>
      </Modal>
    </div>
  );
}
