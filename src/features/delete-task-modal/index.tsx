'use client';
import { Button, Modal } from '@/components';
import { type } from 'os';
import { useContext, useState } from 'react';
import styles from './style.module.css';
import { TaskEntity } from '@/types';
import { deleteTask } from '@/services';
import { TodoContext } from '@/context';

interface DeleteTaskModalProps {
  onClose?: () => void;
  task: TaskEntity;
}

export function DeleteTaskModal(props: DeleteTaskModalProps) {
  const { onClose, task } = props;

  const { setRefetch } = useContext(TodoContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await deleteTask(task.id);
      setRefetch(true);
      handleClose();
      setLoading(false);
    } catch (error) {
      alert('Error deleting task');
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
          {loading ? (
            <Button disabled>Loading...</Button>
          ) : (
            <Button color='primary' onClick={handleConfirm}>
              Delete Task
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
}
