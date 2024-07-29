import { TextField, TextFieldProps } from '@/components';
import { fireEvent, render, screen } from '@testing-library/react';

describe('TextField Component', () => {
  const defaultProps: TextFieldProps = {
    name: 'testName',
    label: 'Test Label',
    value: 'Test Value',
    onChange: jest.fn(),
    type: 'text',
    error: '',
  };

  it('should display the correct label', () => {
    render(<TextField {...defaultProps} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should display the correct value', () => {
    render(<TextField {...defaultProps} />);
    expect(screen.getByDisplayValue('Test Value')).toBeInTheDocument();
  });

  it('should call onChange function when input value changes', () => {
    render(<TextField {...defaultProps} />);
    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith('testName', 'New Value');
  });

  it('should render the input with the correct type', () => {
    render(<TextField {...defaultProps} type='password' />);
    expect(screen.getByLabelText('Test Label')).toHaveAttribute(
      'type',
      'password',
    );
  });
});
