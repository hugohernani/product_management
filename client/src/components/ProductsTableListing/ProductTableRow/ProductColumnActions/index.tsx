import React from 'react';
import { IProduct } from '../../../../interfaces';
import { Button } from 'react-bootstrap';
import { IProductActions } from '../';

const ProductColumnActions: React.FC<{ product: IProduct } & IProductActions> = ({
  children,
  onEdit,
  onDelete,
  product,
}) => {
  return (
    <React.Fragment>
      <Button variant="priamry" size="sm" onClick={(e) => onEdit(product, e)}>
        Edit
      </Button>
      <Button variant="danger" size="sm" onClick={(e) => onDelete(product, e)}>
        Delete
      </Button>
    </React.Fragment>
  );
};

export default ProductColumnActions;
