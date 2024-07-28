'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import styles from './style.module.css';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { IconButton } from '@/components/icon-button';
import { UpdateTaskModal } from '@/features';
import { DeleteTaskModal } from '@/features/delete-task-modal';
import { TaskEntity } from '@/types';
import useOnClickOutside from '@/hooks/use-on-click-outside';

interface TaskOptionsProps {
  task: TaskEntity;
}

export function TaskOptions(props: TaskOptionsProps) {
  const { task } = props;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleOptions = () => {
    setOpen(!open);
  };

  const handleClose = () => setOpen(false);

  const optionListStyles = clsx({
    [styles.optionList]: true,
    [styles.active]: open,
  });

  useOnClickOutside(ref, handleClose);

  return (
    <div ref={ref} className={styles.wrapper}>
      <IconButton onClick={toggleOptions}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </IconButton>
      <ul className={optionListStyles}>
        <UpdateTaskModal task={task} onClose={handleClose} />
        <DeleteTaskModal task={task} onClose={handleClose} />
      </ul>
    </div>
  );
}
