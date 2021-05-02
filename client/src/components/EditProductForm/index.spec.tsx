import React from 'react';
import { render } from '@testing-library/react';
import EditProductForm from './index';
import { IEditProduct } from 'src/interfaces';

test('Form rendering', () => {
  const product = {} as IEditProduct;
  const handler = (product: IEditProduct) => {
    return product;
  };
  render(<EditProductForm product={product} updateHandler={handler} />);
});
