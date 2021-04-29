import React from 'react';
import Logo from '../Logo';
import { Navbar } from 'react-bootstrap';

const NavBar: React.FC = () => {
  return (
    <Navbar expand="lg" bg="light">
      <Navbar.Brand href="/">
        <Logo src="https://via.placeholder.com/150"></Logo>
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavBar;
