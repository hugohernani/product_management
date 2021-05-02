import React from 'react';
import { render } from '@testing-library/react';
import SignUpForm from './index';

test('Form rendering ', () => {
  render(<SignUpForm />);
});
