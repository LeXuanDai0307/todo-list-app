import { HTMLAttributes, ReactNode } from 'react';
import styles from './style.module.css';
import clsx from 'clsx';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'default';
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean | undefined;
}

export function Button(props: ButtonProps) {
  const {
    type = 'button',
    color = 'default',
    children,
    className,
    ...rest
  } = props;

  const buttonStyles = clsx(styles.button, styles[color], className);

  return (
    <button type={type} className={buttonStyles} {...rest}>
      {children}
    </button>
  );
}
