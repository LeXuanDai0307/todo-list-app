import { IconButton } from '@/components/icon-button';
import styles from './style.module.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { ReactNode } from 'react';

export interface ModalProps {
  title?: string;
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export function Modal(props: ModalProps) {
  const { title, open, onClose, children } = props;

  const modalStyles = clsx({ [styles.modal]: true, [styles.open]: open });

  return (
    <div className={modalStyles}>
      <div onClick={onClose} className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <IconButton onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} size='xl' />
          </IconButton>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
