import React from 'react';
import { IProduct } from '../../../../interfaces';
import { Button, Row, Col } from 'react-bootstrap';

export interface IProductActions {
  onEdit: (product: IProduct) => void;
  onDelete: (product: IProduct) => void;
}

const ProductColumnActions: React.FC<{ product: IProduct } & IProductActions> = ({ onEdit, onDelete, product }) => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Button variant="primary" size="sm" onClick={() => onEdit(product)} block>
            Edit
          </Button>
        </Col>
        <Col>
          <Button variant="danger" size="sm" onClick={() => onDelete(product)} block>
            Delete
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ProductColumnActions;
