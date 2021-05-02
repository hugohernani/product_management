import React from 'react';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import UserHeader from 'src/components/UserHeader';

const NavBar: React.FC = () => {
  return (
    <Navbar expand="lg" className="border border-secondary mx-2">
      <Container>
        <Row className="align-items-center">
          <Col md="auto">
            <Button variant="outline-primary" size="lg" active href="/">
              Home
            </Button>
          </Col>

          <UserHeader />
        </Row>
      </Container>
    </Navbar>
  );
};

export default NavBar;
