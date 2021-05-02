import React from 'react';
import { render } from '@testing-library/react';
import InlineForm from '.';

test.skip('Form rendering', () => {
  const { getByRole } = render(
    <InlineForm
      submitHandler={() => {
        console.log;
      }}
    />,
  );

  // TODO:
});
