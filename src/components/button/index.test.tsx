import { Button } from '@/components/button';
import { fireEvent, render, screen } from '@testing-library/react';
import styles from './style.module.css';

describe('Button', () => {
  it('should render a button with text', () => {
    const { getByText } = render(<Button>Click Me</Button>);
    const buttonElement = getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('should render correctly with default props', () => {
    const { getByRole } = render(<Button>Click Me</Button>);
    const buttonElement = getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button default');
    expect(buttonElement).toHaveAttribute('type', 'button');
  });

  it('should apply custom className', () => {
    const { getByText } = render(
      <Button className='custom-class'>Click Me</Button>,
    );
    const buttonElement = getByText(/Click Me/i);
    expect(buttonElement).toHaveClass('custom-class');
    expect(buttonElement).toHaveClass(styles.button);
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click Me</Button>,
    );
    const buttonElement = getByText(/Click Me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should disable when disabled prop is true', () => {
    const { getByText } = render(<Button disabled>Click Me</Button>);
    const buttonElement = getByText(/Click Me/i);
    expect(buttonElement).toBeDisabled();
  });

  it('should render with default type as button', () => {
    const { getByText } = render(<Button>Click Me</Button>);
    const buttonElement = getByText(/Click Me/i);
    expect(buttonElement).toHaveAttribute('type', 'button');
  });

  it('should render with type submit when type prop is submit', () => {
    const { getByText } = render(<Button type='submit'>Submit</Button>);
    const buttonElement = getByText(/Submit/i);
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });
});
