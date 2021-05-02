import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import SignInForm from 'src/components/AuthForm/SignInForm';
import SignUpForm from 'src/components/AuthForm/SignUpForm';
import { IAuthSignComponent } from 'src/interfaces';

interface ILoggedOut {
  openModal: (header: string, handler: IAuthSignComponent) => () => void;
}

const LoggedOut: React.FC<ILoggedOut> = ({ openModal }) => {
  return (
    <Row bsPrefix="col row">
      <Col md="auto">
        <Button variant="primary" onClick={openModal('Sign up', SignUpForm)}>
          Sign Up
        </Button>
      </Col>
      <Col md="auto">
        <Button variant="primary" onClick={openModal('Sign in', SignInForm as IAuthSignComponent)}>
          Sign In
        </Button>
      </Col>
    </Row>
  );
};

export default LoggedOut;
