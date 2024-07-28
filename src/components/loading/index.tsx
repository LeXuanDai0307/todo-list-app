import styles from './style.module.css';
import clsx from 'clsx';

export function Loading() {
  const modalStyles = clsx({ [styles.modal]: true, [styles.open]: true });

  return (
    <div className={modalStyles}>
      <div className={styles.overlay}></div>
      <div className={styles.loader}></div>
    </div>
  );
}
