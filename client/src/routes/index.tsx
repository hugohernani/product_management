import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthProvider from 'src/providers/AuthProvider';
import Homepage from '../pages/Homepage';

const Routes: React.FC = () => (
  <AuthProvider>
    <Switch>
      <Route path="/" exact component={Homepage} />
    </Switch>
  </AuthProvider>
);

export default Routes;
