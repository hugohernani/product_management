import React from 'react';

import { Jumbotron, Container, Row } from 'react-bootstrap';

const Homepage: React.FC = () => {
  return (
    <Jumbotron fluid>
      <Container>
        <Row className="justify-content-md-center">
          <h1>Product Management</h1>
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default Homepage;
