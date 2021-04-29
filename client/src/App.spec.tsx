import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

jest.mock('./routes', () => {
  const FakeRoutes = jest.fn(() => null);

  return {
    __esModule: true,
    default: FakeRoutes,
  };
});

jest.mock('react-router-dom', () => {
  const FakeBrowserRouter = jest.fn(({ children }) => <div>{children}</div>);
  return {
    __isModule: true,
    BrowserRouter: FakeBrowserRouter,
  };
});

test('renders BrowserRouter and Routes', () => {
  render(<App />);

  const children = expect.any(Object);
  expect(BrowserRouter).toHaveBeenCalledWith({ basename: '/', children }, expect.any(Object));
  expect(Routes).toHaveBeenCalled();
});
