import { HTMLAttributes, ReactNode } from 'react';
import styles from './style.module.css';
import clsx from 'clsx';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'default';
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean | undefined;
}

export function Button(props: ButtonProps) {
  const { color = 'default', children, className, ...rest } = props;

  const buttonStyles = clsx(styles.button, styles[color], className);

  return (
    <button className={buttonStyles} {...rest}>
      {children}
    </button>
  );
}
