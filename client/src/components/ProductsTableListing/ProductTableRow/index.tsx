import React, { useCallback, useMemo } from 'react';
import useAlert from 'src/hooks/alerts';
import { IProduct } from '../../../interfaces';
import ProductColumnActions from './ProductColumnActions';

export interface IProductActions {
  onEdit: (product: IProduct, e: any) => void;
  onDelete: (product: IProduct, e: any) => void;
}

const ProductTableRow: React.FC<{ product: IProduct }> = ({ product }) => {
  const handleEdit = useCallback((product: IProduct, e: any) => {
    console.log('Editing');
    console.table(product);
  }, []);

  const handleDelete = useCallback((product: IProduct, e: any) => {
    console.log('Deleting');
    console.table(product);
  }, []);

  const productCreatedAt = useMemo(() => {
    return new Date(product.created_at).toDateString();
  }, [product.created_at]);

  return (
    <tr key={product.id}>
      <td>{product.title}</td>
      <td>{product.type}</td>
      <td>{product.rating}</td>
      <td>{product.price}</td>
      <td>{productCreatedAt}</td>
      <td>
        <ProductColumnActions product={product} onEdit={handleEdit} onDelete={handleDelete} />{' '}
      </td>
    </tr>
  );
};

export default ProductTableRow;
