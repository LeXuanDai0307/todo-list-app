import { render, fireEvent } from '@testing-library/react';
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
    const { getByLabelText, getByDisplayValue } = render(
      <Select {...defaultProps} />,
    );
    expect(getByLabelText('Test Select')).toBeInTheDocument();
    expect(getByDisplayValue('Option 1')).toBeInTheDocument();
  });

  it('should call onChange when a different option is selected', () => {
    const { getByLabelText } = render(<Select {...defaultProps} />);
    fireEvent.change(getByLabelText('Test Select'), {
      target: { value: 'option2' },
    });
    expect(defaultProps.onChange).toHaveBeenCalledWith(
      'test-select',
      'option2',
    );
  });

  it('renders all options correctly', () => {
    const { getByText } = render(<Select {...defaultProps} />);
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
  });
});
