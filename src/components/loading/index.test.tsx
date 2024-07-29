import React from 'react';
import { render } from '@testing-library/react';
import { Loading } from './index';
import styles from './style.module.css';

test('should render Loading component with correct class names', () => {
  const { container } = render(<Loading />);

  const modalDiv = container.firstChild;
  expect(modalDiv).toHaveClass(styles.modal);
  expect(modalDiv).toHaveClass(styles.open);

  const overlayDiv = container.querySelector(`.${styles.overlay}`);
  expect(overlayDiv).toBeInTheDocument();

  const loaderDiv = container.querySelector(`.${styles.loader}`);
  expect(loaderDiv).toBeInTheDocument();
});
