import { HTMLAttributes, ReactNode } from 'react';
import styles from './style.module.css';
import clsx from 'clsx';

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function IconButton(props: IconButtonProps) {
  const { children, className, ...rest } = props;

  const buttonStyles = clsx(styles.button, className);

  return (
    <button {...rest} className={buttonStyles}>
      {children}
    </button>
  );
}
