import React from 'react';
import { IProduct } from '../../interfaces';
import { Table } from 'react-bootstrap';
import ProductTableRow from './ProductTableRow';

const ProductsTableListing: React.FC<{ products: IProduct[] }> = ({ products }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Type</th>
          <th>Rating</th>
          <th>Price</th>
          <th>Created</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products &&
          products.map((product) => {
            <ProductTableRow product={product} />;
          })}
      </tbody>
    </Table>
  );
};

export default ProductsTableListing;
