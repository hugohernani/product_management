import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

interface ILoggedIn {
  logoutHandler: () => void;
}

const LoggedIn: React.FC<ILoggedIn> = ({ logoutHandler }) => {
  return (
    <Row bsPrefix="col row">
      <Col md="auto">
        <Button variant="primary" onClick={logoutHandler}>
          Log out
        </Button>
      </Col>
    </Row>
  );
};

export default LoggedIn;
