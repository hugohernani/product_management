import React from 'react';
import { render } from '@testing-library/react';
import ProductsInlineBulkUpload from '.';
import InlineForm from './InlineForm';

jest.mock('./InlineForm', () => {
  const FakeInlineForm = jest.fn(() => null);

  return {
    __esModule: true,
    default: FakeInlineForm,
  };
});

test('Form rendering delegated to sub component', () => {
  render(<ProductsInlineBulkUpload />);

  expect(InlineForm).toHaveBeenCalled();
});
