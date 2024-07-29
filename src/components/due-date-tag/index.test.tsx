import { render } from '@testing-library/react';
import { DueDateTag, DueDateTagProps } from './index';
import { DueDate, Priority, PRIORITY_CLASS } from '@/utils';
import styles from './style.module.css';
import clsx from 'clsx';

describe('DueDateTag', () => {
  const defaultProps: DueDateTagProps = {
    dueDate: DueDate.MONDAY,
    priority: Priority.DEFAULT,
  };

  it('should render the due date', () => {
    const { getByText } = render(<DueDateTag {...defaultProps} />);
    const dueDateElement = getByText(DueDate.MONDAY);
    expect(dueDateElement).toBeInTheDocument();
  });

  it('should apply default priority class when priority is not provided', () => {
    const { getByText } = render(<DueDateTag {...defaultProps} />);
    const dueDateElement = getByText(DueDate.MONDAY);
    const expectedClass = clsx({
      [styles.base]: true,
      [styles[PRIORITY_CLASS[Priority.DEFAULT]]]: true,
    });
    expect(dueDateElement).toHaveClass(expectedClass);
  });

  it('should apply the correct priority class when priority is provided', () => {
    const { getByText } = render(
      <DueDateTag dueDate={defaultProps.dueDate} priority={Priority.HIGH} />,
    );
    const dueDateElement = getByText(DueDate.MONDAY);
    const expectedClass = clsx({
      [styles.base]: true,
      [styles[PRIORITY_CLASS[Priority.HIGH]]]: true,
    });
    expect(dueDateElement).toHaveClass(expectedClass);
  });
});
