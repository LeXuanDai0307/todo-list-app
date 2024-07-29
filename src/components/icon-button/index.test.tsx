import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';
import { IconButton } from './index';

describe('IconButton Component', () => {
  it('should render children correctly', () => {
    render(<IconButton>Click Me</IconButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<IconButton className='custom-class'>Click Me</IconButton>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<IconButton onClick={handleClick}>Click Me</IconButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
