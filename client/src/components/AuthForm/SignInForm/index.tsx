import React from 'react';
import { ISignInCredentials } from 'src/interfaces';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import validationSchema from './validation-schema';

interface ISignInForm {
  submitHandler: (authFormValues: ISignInCredentials) => void;
}

const SignInForm: React.FC<ISignInForm> = ({ submitHandler }) => {
  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={submitHandler}
      initialValues={{
        email: '',
        password: '',
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              onChange={handleChange}
              defaultValue={values.email}
              isValid={touched.email && !errors.email}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Password"
              onChange={handleChange}
              defaultValue={values.password}
              isValid={touched.password && !errors.password}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
