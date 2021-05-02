import React from 'react';
import { render } from '@testing-library/react';
import AuthForm from './index';
import SignUpForm from './SignUpForm';

test('Form rendering ', () => {
  render(<AuthForm authComponent={SignUpForm} />);
});
