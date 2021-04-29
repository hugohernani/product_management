import React from 'react';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';

const NavBar: React.FC = () => {
  return (
    <Navbar expand="lg" className="border border-secondary mx-2">
      <Container>
        <Row noGutters={true}>
          <Col md={{ span: 4, offset: 4 }}>
            <Button variant="outline-primary" size="lg" active href="/">
              Home
            </Button>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default NavBar;
