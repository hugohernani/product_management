import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <BrowserRouter basename={'/'}>
        <Routes />
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
