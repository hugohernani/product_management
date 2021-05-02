import React from 'react';
import { render } from '@testing-library/react';
import SignInForm from './index';
import { ISignInCredentials } from 'src/interfaces';

test('Form rendering ', () => {
  render(
    <SignInForm
      submitHandler={(formValues: ISignInCredentials) => {
        console.log(formValues);
      }}
    />,
  );
});
