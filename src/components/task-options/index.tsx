'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import styles from './style.module.css';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import useOnClickOutside from '@/hooks/useOnClickOutside';

interface TaskOptionsProps {}

export function TaskOptions(props: TaskOptionsProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleOptions = () => {
    setOpen(!open);
  };

  const optionListStyles = clsx({
    [styles.optionList]: true,
    [styles.active]: open,
  });

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className={styles.wrapper}>
      <button onClick={toggleOptions} className={styles.optionsBtn}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </button>
      <ul className={optionListStyles}>
        <li>Update</li>
        <li>Delete</li>
      </ul>
    </div>
  );
}
