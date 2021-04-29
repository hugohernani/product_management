import React from 'react';
import { render } from '@testing-library/react';
import { Switch, Route } from 'react-router-dom';
import Routes from '.';

jest.mock('react-router-dom', () => {
  const FakeSwitch = jest.fn(({ children }) => <div>{children}</div>);
  const FakeRoute = jest.fn(() => null);

  return {
    __isModule: true,
    Switch: FakeSwitch,
    Route: FakeRoute,
  };
});

test('renders Switch and Route for Homepage', () => {
  render(<Routes />);

  const children = expect.any(Object);
  const context = expect.any(Object);
  const Homepage = expect.any(Function);

  expect(Switch).toHaveBeenCalledWith({ children }, context);
  expect(Route).toHaveBeenCalledWith({ path: '/', exact: true, component: Homepage }, context);
});
