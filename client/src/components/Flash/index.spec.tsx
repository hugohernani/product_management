import React from 'react';
import { render } from '@testing-library/react';
import Flash from '.';

test('renders bootstrap Alert component with provided arguments', () => {
  const message = 'Products Batch successfully uploaded';
  const { getByRole } = render(<Flash message={message} type="primary" />);

  const alertElement = getByRole('alert');
  expect(alertElement).toHaveClass('fade', 'alert', 'alert-primary', 'show');
  expect(alertElement).toHaveTextContent(message);

  const buttonElement = getByRole('button');
  expect(buttonElement).toHaveTextContent(/Close alert/);
});
