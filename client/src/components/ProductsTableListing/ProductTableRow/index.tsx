import React, { useCallback, useMemo } from 'react';
import Logo from 'src/components/Logo';
import useModal from 'src/hooks/global_modal';
import { IProduct } from '../../../interfaces';
import ProductColumnActions from './ProductColumnActions';

export interface IProductActions {
  onEdit: (product: IProduct, e: any) => void;
  onDelete: (product: IProduct, e: any) => void;
}

const ProductTableRow: React.FC<{ product: IProduct }> = ({ product }) => {
  const { setModal } = useModal();

  const handleEdit = useCallback((product: IProduct, e: any) => {
    setModal({ header: 'Testing', component: <Logo src="/" /> });
    console.log('editing');
  }, []);

  const handleDelete = useCallback((product: IProduct, e: any) => {
    console.log('Deleting it');
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
