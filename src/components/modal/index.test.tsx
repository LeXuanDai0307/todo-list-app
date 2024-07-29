import { Modal } from '@/components/modal';
import { render, fireEvent } from '@testing-library/react';
import styles from './style.module.css';

describe('Modal Component', () => {
  const defaultProps = {
    title: 'Test Modal',
    open: true,
    onClose: jest.fn(),
    children: <div>Modal Content</div>,
  };

  it('should render the modal with the correct title and content', () => {
    const { getByText } = render(<Modal {...defaultProps} />);
    expect(getByText('Test Modal')).toBeInTheDocument();
    expect(getByText('Modal Content')).toBeInTheDocument();
  });

  it('should call onClose when the overlay is clicked', () => {
    const { container } = render(<Modal {...defaultProps} />);
    const overlay = container.querySelector(`.${styles.overlay}`);
    overlay && fireEvent.click(overlay);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when the close button is clicked', () => {
    const { getByRole } = render(<Modal {...defaultProps} />);
    fireEvent.click(getByRole('button'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('should have the open class when open is true', () => {
    const { container } = render(<Modal {...defaultProps} />);
    expect(container.firstChild).toHaveClass(styles.open);
  });

  it('should not have the open class when open is false', () => {
    const { container } = render(<Modal {...defaultProps} open={false} />);
    expect(container.firstChild).not.toHaveClass('open');
  });
});
