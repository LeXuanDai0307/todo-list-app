import { render, screen, fireEvent } from '@testing-library/react';
import styles from './style.module.css';
import { Select, SelectOption, SelectProps } from '@/components/select';

describe('Select Component', () => {
  const defaultProps: SelectProps = {
    name: 'test-select',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ] as SelectOption[],
    label: 'Test Select',
    value: { value: 'option1', label: 'Option 1' },
    onChange: jest.fn(),
  };

  it('should render correctly with given props', () => {
    render(<Select {...defaultProps} />);
    expect(screen.getByLabelText('Test Select')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Option 1')).toBeInTheDocument();
  });

  it('should call onChange when a different option is selected', () => {
    render(<Select {...defaultProps} />);
    fireEvent.change(screen.getByLabelText('Test Select'), {
      target: { value: 'option2' },
    });
    expect(defaultProps.onChange).toHaveBeenCalledWith(
      'test-select',
      'option2',
    );
  });

  it('renders all options correctly', () => {
    render(<Select {...defaultProps} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });
});
