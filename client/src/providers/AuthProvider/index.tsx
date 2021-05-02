import React, { useCallback, useState } from 'react';
import { AuthContext } from '../../context';

const AuthProvider: React.FC = (props) => {
  const [loggedIn, setLoggedIn] = useState(() => window.localStorage.getItem('token') !== null);

  const setToken = useCallback(
    (token: string) => {
      window.localStorage.setItem('token', token);
      setLoggedIn(true);
    },
    [setLoggedIn],
  );

  const unSetToken = useCallback(() => {
    window.localStorage.removeItem('token');
    setLoggedIn(false);
  }, [setLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn: loggedIn, login: setToken, logout: unSetToken }} {...props}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
