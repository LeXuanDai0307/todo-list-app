'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import styles from './style.module.css';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { IconButton } from '@/components/icon-button';
import { UpdateTaskModal } from '@/features';
import { DeleteTaskModal } from '@/features/delete-task-modal';

interface TaskOptionsProps {}

export function TaskOptions(props: TaskOptionsProps) {
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
        <UpdateTaskModal onClose={handleClose} />
        <DeleteTaskModal onClose={handleClose} />
      </ul>
    </div>
  );
}
