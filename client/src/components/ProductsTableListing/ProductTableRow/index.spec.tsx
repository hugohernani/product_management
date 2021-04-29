import React from 'react';
import { render } from '@testing-library/react';
import ProductTableRow from '.';
import { IProduct } from '../../../interfaces';

const product = {} as IProduct;

test.skip('Products table rendering', () => {
  render(<ProductTableRow product={product} />);
  // TODO:
});
