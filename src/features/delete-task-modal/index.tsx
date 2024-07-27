'use client';
import { Button, Modal } from '@/components';
import { type } from 'os';
import { useState } from 'react';
import styles from './style.module.css';

interface DeleteTaskModalProps {
  onClose?: () => void;
}

export function DeleteTaskModal(props: DeleteTaskModalProps) {
  const { onClose } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div>
      <li onClick={handleOpen}>Delete</li>
      <Modal title='Confirm Task Deletion' open={open} onClose={handleClose}>
        <p className={styles.confirmText}>
          Are you sure you want to delete this task? This action cannot be
          undone.
        </p>
        <div className={styles.formActionsWrapper}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color='primary' onClick={handleClose}>
            Delete Task
          </Button>
        </div>
      </Modal>
    </div>
  );
}
