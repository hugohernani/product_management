import React, { useCallback, useMemo } from 'react';
import EditProductForm from 'src/components/EditProductForm';
import useModal from 'src/hooks/GlobalModal';
import { IEditProduct, IProduct } from '../../../interfaces';
import ProductColumnActions from './ProductColumnActions';

interface IProductTableRow {
  product: IProduct;
  onUpdate: (product: IEditProduct) => void;
  onRemove: (product: IProduct) => void;
}

const ProductTableRow: React.FC<IProductTableRow> = ({ product, onRemove, onUpdate }) => {
  const { setModal } = useModal();

  const handleEdit = useCallback(
    (product: IProduct) => {
      setModal({
        header: `Editing ${product.title}`,
        component: <EditProductForm product={product} updateHandler={onUpdate} />,
      });
    },
    [setModal, onUpdate],
  );

  const handleDelete = (product: IProduct) => {
    onRemove(product);
  };

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
