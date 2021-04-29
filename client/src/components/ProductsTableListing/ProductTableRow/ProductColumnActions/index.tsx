import React from 'react';
import { IProduct } from '../../../../interfaces';
import { Button, Row, Col } from 'react-bootstrap';
import { IProductActions } from '../';

const ProductColumnActions: React.FC<{ product: IProduct } & IProductActions> = ({ onEdit, onDelete, product }) => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Button variant="primary" size="sm" onClick={(e) => onEdit(product, e)} block>
            Edit
          </Button>
        </Col>
        <Col>
          <Button variant="danger" size="sm" onClick={(e) => onDelete(product, e)} block>
            Delete
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ProductColumnActions;
