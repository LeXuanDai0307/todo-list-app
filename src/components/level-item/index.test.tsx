import { render } from '@testing-library/react';
import { LevelItem, LevelItemProps } from './index';
import { Priority, PRIORITY_CLASS } from '@/utils';
import styles from './style.module.css';

describe('LevelItem Component', () => {
  it('should render with default priority', () => {
    const { container } = render(<LevelItem />);
    expect(container.firstChild).toHaveClass(styles.base);
    expect(container.firstChild).toHaveClass(
      styles[PRIORITY_CLASS[Priority.DEFAULT]],
    );
  });

  it('should render with HIGH priority', () => {
    const { container } = render(<LevelItem priority={Priority.HIGH} />);
    expect(container.firstChild).toHaveClass(styles.base);
    expect(container.firstChild).toHaveClass(
      styles[PRIORITY_CLASS[Priority.HIGH]],
    );
  });

  it('should render with LOW priority', () => {
    const { container } = render(<LevelItem priority={Priority.LOW} />);
    expect(container.firstChild).toHaveClass(styles.base);
    expect(container.firstChild).toHaveClass(
      styles[PRIORITY_CLASS[Priority.LOW]],
    );
  });

  it('should render with MEDIUM priority', () => {
    const { container } = render(<LevelItem priority={Priority.MEDIUM} />);
    expect(container.firstChild).toHaveClass(styles.base);
    expect(container.firstChild).toHaveClass(
      styles[PRIORITY_CLASS[Priority.MEDIUM]],
    );
  });
});
