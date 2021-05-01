import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { IProductEditForm } from 'src/interfaces';

type IProductForm = IProductEditForm & {
  changeHandler: (e: any) => void;
  submitHandler: (e: any) => void;
};

const ProductForm: React.FC<IProductForm> = ({ changeHandler, submitHandler, product }) => {
  return (
    <Form>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title" onChange={changeHandler} defaultValue={product.title} />
      </Form.Group>

      <Form.Group controlId="formBasicType">
        <Form.Label>Type</Form.Label>
        <Form.Control type="text" placeholder="Enter Type" onChange={changeHandler} value={product.type} />
      </Form.Group>

      <Form.Group controlId="formBasicRating">
        <Form.Label>Rating</Form.Label>
        <Form.Control type="range" min="0" max="10" onChange={changeHandler} value={product.rating} />
      </Form.Group>

      <Form.Group controlId="formBasicPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" min="0" step="any" onChange={changeHandler} value={product.price} />
      </Form.Group>

      <Button variant="primary" onClick={submitHandler}>
        Submit
      </Button>
    </Form>
  );
};

export default ProductForm;
