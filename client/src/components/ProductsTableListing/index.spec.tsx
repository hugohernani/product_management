import React from 'react';
import { render } from '@testing-library/react';
import ProductsTableListing from '.';
import { IProduct } from '../../interfaces';

const products = [] as IProduct[];

test('Products table rendering', () => {
  render(<ProductsTableListing products={products} />);
  // TODO:
});
