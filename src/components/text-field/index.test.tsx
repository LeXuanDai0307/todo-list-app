import { TextField, TextFieldProps } from '@/components';
import { fireEvent, render } from '@testing-library/react';

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
    const { getByText } = render(<TextField {...defaultProps} />);
    expect(getByText('Test Label')).toBeInTheDocument();
  });

  it('should display the correct value', () => {
    const { getByDisplayValue } = render(<TextField {...defaultProps} />);
    expect(getByDisplayValue('Test Value')).toBeInTheDocument();
  });

  it('should call onChange function when input value changes', () => {
    const { getByLabelText } = render(<TextField {...defaultProps} />);
    const input = getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith('testName', 'New Value');
  });

  it('should render the input with the correct type', () => {
    const { getByLabelText } = render(
      <TextField {...defaultProps} type='password' />,
    );
    expect(getByLabelText('Test Label')).toHaveAttribute('type', 'password');
  });
});
