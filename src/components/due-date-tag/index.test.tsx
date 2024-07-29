import { render, screen } from '@testing-library/react';
import { DueDateTag, DueDateTagProps } from './index';
import { Priority, PRIORITY_CLASS } from '@/utils';
import styles from './style.module.css';
import clsx from 'clsx';

describe('DueDateTag', () => {
  const defaultProps: DueDateTagProps = {
    dueDate: 'Mon',
    priority: Priority.DEFAULT,
  };

  it('should render the due date', () => {
    render(<DueDateTag {...defaultProps} />);
    const dueDateElement = screen.getByText(/Mon/i);
    expect(dueDateElement).toBeInTheDocument();
  });

  it('should apply default priority class when priority is not provided', () => {
    render(<DueDateTag {...defaultProps} />);
    const dueDateElement = screen.getByText(/Mon/i);
    const expectedClass = clsx({
      [styles.base]: true,
      [styles[PRIORITY_CLASS[Priority.DEFAULT]]]: true,
    });
    expect(dueDateElement).toHaveClass(expectedClass);
  });

  it('should apply the correct priority class when priority is provided', () => {
    render(
      <DueDateTag dueDate={defaultProps.dueDate} priority={Priority.HIGH} />,
    );
    const dueDateElement = screen.getByText(/Mon/i);
    const expectedClass = clsx({
      [styles.base]: true,
      [styles[PRIORITY_CLASS[Priority.HIGH]]]: true,
    });
    expect(dueDateElement).toHaveClass(expectedClass);
  });
});
