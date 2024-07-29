import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { IconButton } from './index';

describe('IconButton Component', () => {
  it('should render children correctly', () => {
    const { getByText } = render(<IconButton>Click Me</IconButton>);
    expect(getByText('Click Me')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { getByRole } = render(
      <IconButton className='custom-class'>Click Me</IconButton>,
    );
    expect(getByRole('button')).toHaveClass('custom-class');
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <IconButton onClick={handleClick}>Click Me</IconButton>,
    );
    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
