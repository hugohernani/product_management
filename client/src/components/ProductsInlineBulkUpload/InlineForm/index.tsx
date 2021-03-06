import React from 'react';
import { Form, FormFile, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { IInlineForm } from '../index';

const InlineForm: React.FC<IInlineForm> = ({ submitHandler }) => {
  return (
    <Form>
      <Row className="mx-5">
        <Col xs={10}>
          <FormFile
            id="custom-file"
            className="mb-2 mr-auto"
            placeholder="Anexar Arquivo .json"
            label="Anexar Arquivo .json"
          ></FormFile>
        </Col>
        <Col>
          <Button type="button" onClick={submitHandler} className="mb-2" block>
            Enviar
          </Button>
        </Col>
      </Row>
      <Row className="mx-5">
        <Link download to="/products.json" target="_blank">
          Click here for a sample
        </Link>
      </Row>
    </Form>
  );
};

export default InlineForm;
