import { render } from '@testing-library/react';
import { LevelItem, LevelItemProps } from './index';
import { Priority, PRIORITY_CLASS } from '@/utils';
import styles from './style.module.css';

describe('LevelItem Component', () => {
  const renderComponent = (props: LevelItemProps = {}) =>
    render(<LevelItem {...props} />);

  it('should render with default priority', () => {
    const { container } = renderComponent();
    expect(container.firstChild).toHaveClass(styles.base);
    expect(container.firstChild).toHaveClass(
      styles[PRIORITY_CLASS[Priority.DEFAULT]],
    );
  });

  it('should render with high priority', () => {
    const { container } = renderComponent({ priority: Priority.HIGH });
    expect(container.firstChild).toHaveClass(styles.base);
    expect(container.firstChild).toHaveClass(
      styles[PRIORITY_CLASS[Priority.HIGH]],
    );
  });

  it('should render with low priority', () => {
    const { container } = renderComponent({ priority: Priority.LOW });
    expect(container.firstChild).toHaveClass(styles.base);
    expect(container.firstChild).toHaveClass(
      styles[PRIORITY_CLASS[Priority.LOW]],
    );
  });

  it('should render with medium priority', () => {
    const { container } = renderComponent({ priority: Priority.MEDIUM });
    expect(container.firstChild).toHaveClass(styles.base);
    expect(container.firstChild).toHaveClass(
      styles[PRIORITY_CLASS[Priority.MEDIUM]],
    );
  });
});
