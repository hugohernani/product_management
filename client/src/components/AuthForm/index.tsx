import React, { useCallback } from 'react';
import { ISignInCredentials, ISignUpCredentials } from 'src/interfaces';
import useAuthApi from 'src/hooks/auth-api';
import SignUpForm from './SignUpForm';
import useModal from 'src/hooks/GlobalModal';
import useAlert from 'src/hooks/alerts';

interface IAuthSignUpHandler {
  submitHandler: (authFormValues: ISignUpCredentials) => void;
}

interface IAuthSignInHandler {
  submitHandler: (authFormValues: ISignInCredentials) => void;
}

interface IAuthForm {
  authComponent: React.FC<IAuthSignUpHandler | IAuthSignInHandler>;
}

const AuthForm: React.FC<IAuthForm> = ({ authComponent: AuthComponent }) => {
  const api = useAuthApi();
  const { onModalClose } = useModal();
  const { setFlash } = useAlert();

  const onSignUpSubmit = useCallback(
    (authForm: ISignUpCredentials) => {
      onModalClose(async () => {
        await api.signUp(authForm);
        setFlash({ message: 'User was sucessfully created', type: 'success' });
      });
    },
    [api, onModalClose, setFlash],
  );

  const onSignInSubmit = useCallback(
    (authForm: ISignInCredentials) => {
      onModalClose(async () => {
        await api.signIn(authForm);
        setFlash({ message: 'User sucessfully signed in', type: 'success' });
      });
    },
    [api, onModalClose, setFlash],
  );

  const onAuthSubmit = useCallback(() => {
    AuthComponent === SignUpForm ? onSignUpSubmit : onSignInSubmit;
  }, [AuthComponent, onSignUpSubmit, onSignInSubmit]);

  return <AuthComponent submitHandler={onAuthSubmit} />;
};

export default AuthForm;
