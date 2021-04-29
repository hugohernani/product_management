import React from 'react';
import { render } from '@testing-library/react';
import ProductColumnActions from '.';
import { IProduct } from '../../../../interfaces';

const product = {} as IProduct;

const onEdit = jest.fn((product: IProduct, e: any): void => {
  return;
});
const onDelete = jest.fn((product: IProduct, e: any): void => {
  return;
});

test.skip('Products table rendering', () => {
  render(<ProductColumnActions product={product} onEdit={onEdit} onDelete={onDelete} />);

  // TODO:
});
