import React, { useCallback } from 'react';
import { IAuthSignComponent, ISignCredentials, ISignInCredentials, ISignUpCredentials } from 'src/interfaces';
import useAuthApi from 'src/hooks/auth-api';
import SignUpForm from './SignUpForm';
import useModal from 'src/hooks/GlobalModal';
import useAlert from 'src/hooks/alerts';
import useLoggedIn from 'src/hooks/logged-in';

interface IAuthForm {
  authComponent: IAuthSignComponent;
}

const AuthForm: React.FC<IAuthForm> = ({ authComponent: AuthComponent }) => {
  const api = useAuthApi();
  const { onModalClose } = useModal();
  const { setFlash } = useAlert();
  const { login } = useLoggedIn();

  const onSignUpSubmit = useCallback(
    (authForm: ISignUpCredentials) => {
      onModalClose(async () => {
        try {
          const { auth_token } = await api.signUp(authForm);
          setFlash({ message: 'User was sucessfully created', type: 'success' });
          login(auth_token);
        } catch (error) {
          const { message } = error.response.data;
          setFlash({ message: message, type: 'danger' });
        }
      });
    },
    [api, login, onModalClose, setFlash],
  );

  const onSignInSubmit = useCallback(
    (authForm: ISignInCredentials) => {
      onModalClose(async () => {
        try {
          const { auth_token } = await api.signIn(authForm);
          setFlash({ message: 'User successfully signed in', type: 'success' });
          login(auth_token);
        } catch (error) {
          const { message } = error.response.data;
          setFlash({ message: message, type: 'danger' });
        }
      });
    },
    [api, onModalClose, login, setFlash],
  );

  const onAuthSubmit = useCallback(
    (formValues: ISignCredentials, e: any) => {
      e.setSubmitting(false);
      AuthComponent === SignUpForm
        ? onSignUpSubmit(formValues as ISignUpCredentials)
        : onSignInSubmit(formValues as ISignInCredentials);
    },
    [AuthComponent, onSignUpSubmit, onSignInSubmit],
  );

  return <AuthComponent submitHandler={onAuthSubmit} />;
};

export default AuthForm;
