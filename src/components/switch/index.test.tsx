import { Switch, SwitchProps } from '@/components/switch';
import { fireEvent, render, screen } from '@testing-library/react';
import styles from './style.module.css';

describe('Switch Component', () => {
  const defaultProps: SwitchProps = {
    label: 'Test Label',
    isChecked: false,
    setIsChecked: jest.fn(),
  };

  test('should display the label when provided', () => {
    render(<Switch {...defaultProps} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  test('should not display the label when not provided', () => {
    render(
      <Switch
        isChecked={defaultProps.isChecked}
        setIsChecked={defaultProps.setIsChecked}
      />,
    );
    expect(screen.queryByText('Test Label')).not.toBeInTheDocument();
  });

  test('should toggle the checkbox state when clicked', () => {
    render(<Switch {...defaultProps} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(defaultProps.setIsChecked).toHaveBeenCalledWith(true);
  });

  test('should apply the checked class when isChecked is true', () => {
    const { container } = render(
      <Switch isChecked={true} setIsChecked={defaultProps.setIsChecked} />,
    );
    const circle = container.querySelector(`.${styles.circle}`);
    expect(circle).toHaveClass(styles.checked);
  });

  test('should not apply the checked class when isChecked is false', () => {
    const { container } = render(<Switch {...defaultProps} />);
    const circle = container.querySelector(`.${styles.circle}`);
    expect(circle).not.toHaveClass(styles.checked);
  });
});
